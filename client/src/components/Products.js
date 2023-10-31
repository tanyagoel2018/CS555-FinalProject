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
import useSnackbar from "../hooks/useSnackbar";

const Products = (props) => {
  const [rewards, setRewards] = useState(props.rewards);
  const snackbar = useSnackbar();
  const {restAPI} = useApi();
  const [products, setProducts] = useState(productData);

  const purchaseProduct = async (points, image) => {
    const values = {
      rewards: points,
      image: image,
    };
    try {
      await restAPI.post("/protected/products", values);
      setRewards(rewards - values.points);
      snackbar.showSuccess("Purchase Successfull!");
      props.reloadParent(props.reload + 1);
    } catch (error) {
      if (error && error.response && error.response.data) {
        snackbar.showError(error.response.data || "Something went wrong");
      }
    }
  };
  
  return (
    <div className="center">
      <h2>Products</h2>
      <Grid container spacing={2}>
        {products.map((product) => {
          const { name, points, img,cardImg } = product;
          return <IndividualProduct name={name} points={points} img = {img} cardImg={cardImg} purchaseProduct={purchaseProduct}/>
        })}
      </Grid>
      <CustomSnackbar snackbarProp={snackbar} />
    </div>
  );
};

const IndividualProduct = ({purchaseProduct, name, points, img, cardImg })=>{
      return (
        <Grid item xs={6}>
        <Card sx={{ maxWidth: 345}}>
          <CardActionArea onClick={() =>purchaseProduct(points,img)}>
            <CardMedia
              component="img"
              height="140"
              image= {cardImg}
              alt="green iguana"
            />
            <CardContent sx={{backgroundColor:'#EEAC02'}}>
              <Typography>{name}</Typography>
              <Typography>{points} Points</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      );
}
export default Products;