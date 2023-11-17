import React, { useEffect, useState } from "react";
import { useApi } from "../ContextAPI/APIContext";
import CustomSnackbar from "./CustomSnackbar";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Button, Paper
} from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";

const Products = (props) => {

  const [rewards, setRewards] = useState(props.rewards);
  const snackbar = useSnackbar();
  const {restAPI} = useApi();
  const [products, setProducts] = useState([]);
  const [productOwned, setProductOwned] = useState([]);
  const [transaction, setTransaction] = useState(false);
  const [localOutfit, setLocalOutfit] = useState(props.gif);

  const fetchAllProducts = async()=>{
    let  response = undefined;
    try {
         response = await restAPI.get("/protected/products");
         const response2 = await restAPI.get("/protected/products/myProducts");
          console.log(response2);
         setProducts(response.data.products);
         setProductOwned(response2.data.products);
      } catch (error) {
      }

  }
  useEffect(()=>{
    fetchAllProducts();
  },[transaction])



  const handleSaveOutfit =async ()=>{
        try {
         let response = await restAPI.post("/protected/products/myProducts", {img: localOutfit});
         console.log(response.data);
        } catch (error) {
        }
  };

  const purchaseProduct = async (points, image, id, own) => {
    const values = {
      productId: id,
    };
    
    try {
     const response =  await restAPI.post("/protected/products", values);
     console.log(response.data.msg);
      setRewards(rewards - values.points);
      snackbar.showSuccess("Purchase Successfull!");
      // updateProductList(id);
      console.log(products);
      setTransaction(!transaction);
      props.reloadParent(props.reload + 1);
    } catch (error) {
      if (error && error.response && error.response.data) {
        snackbar.showError(error.response.data || "Something went wrong");
      }
    }
  };
  
  return (
    <div className="center">
      <h2>Store</h2>
      <Grid container spacing={2}>
        {products.map((product) => {
          return <IndividualProduct product={product} purchaseProduct={purchaseProduct}/>
        })}
      </Grid>
      <h2>My Products</h2>
      <Grid container spacing={2} marginBottom={2}>
        {productOwned.map((product) => {
          return <MyProducts product={product} />
        })}
      </Grid>
      <Paper
            elevation={10}
            sx={{
            bgcolor: "#54ff76",
            width: "5em",
            height: "3em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "20px",
            cursor: "pointer",
            }}
            onClick={handleSaveOutfit}
            >
            save outfit
        </Paper>
      <CustomSnackbar snackbarProp={snackbar} />
    </div>
  );
};

const IndividualProduct = ({purchaseProduct, product})=>{
  const { name, points, img,cardImg,_id, own } = product;

  let color = own?"#d1fcae": "#d9dbd7";
    let status = own?"Purchased":`${points} points`
      return (
        <Grid item xs={6}>
        <Card sx={{ maxWidth: 345}}>
          <CardActionArea onClick={() =>purchaseProduct(points,img,_id, own)}>
            <CardMedia
              component="img"
              height="140"
              image= {cardImg}
              alt="green iguana"
            />
            <CardContent sx={{backgroundColor:color}}>
              <Typography>{name}</Typography>
              <Typography>{status}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      );
}
const MyProducts = ({product})=>{
  const { name, img,cardImg, _id,} = product;

  let color = "#d1fcae";
      return (
        <Grid item xs={6}>
        <Card sx={{ maxWidth: 345}}>
          <CardActionArea onClick={() =>{}}>
            <CardMedia
              component="img"
              height="140"
              image= {cardImg}
              alt="green iguana"
            />
            <CardContent sx={{backgroundColor:color}}>
              <Typography>{name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      );

}
export default Products;