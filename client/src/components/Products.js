import React, { useState } from "react";
import { useApi } from "../ContextAPI/APIContext";
import {productData} from "../data/productData"
import CustomSnackbar from "./CustomSnackbar";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";

const Products = (props) => {
  const [rewards, setRewards] = useState(props.rewards);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something gone wrong");
  const {restAPI} = useApi();
  const [products, setProducts]= useState(productData);

  const purchaseProduct = async (points, image) => {
    const values = {
      rewards: points,
      image: image,
    };
    try {
      await restAPI.post("/protected/products", values);
      setRewards(rewards - values.points);
      setSuccess(true);
      props.reloadParent(props.reload + 1);
    } catch (error) {
      setError(true);
      if (error && error.response && error.response.data) {
        setErrorMsg(error.response.data);
      }
    }
  };

  const snackbarProp = {success, setError, setSuccess, error, errorMsg, setErrorMsg, successMsg:"Purchase Successfull!" }
  return (
    <div className="center">
      <h2>Products</h2>
      <Grid container spacing={2}>
        {products.map((product) => {
          const { name, points, img } = product;
          return <IndividualProduct name={name} points={points} img = {img} purchaseProduct={purchaseProduct}/>
        })}
      </Grid>
      <CustomSnackbar snackbarProp={snackbarProp} />
    </div>
  );
};

const IndividualProduct = ({purchaseProduct, name, points, img })=>{
      return (
        <Grid item xs={6}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea onClick={() =>purchaseProduct(points,img)}>
            <CardMedia
              component="img"
              height="140"
              image= {img}
              alt="green iguana"
            />
            <CardContent>
              <Typography>{name}</Typography>
              <Typography>{points} Points</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      );
}
export default Products;