import React, { useEffect, useState } from "react";
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
  const [products, setProducts] = useState([]);
  const [productOwned, setProductOwned] = useState([]);
  const [transaction, setTransaction] = useState(false);

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

  const updateProductList = (id)=>{
    setProducts(products.map((product=>{
      if (id === product.id){
          return {...product, own:true };
      } 
      return product;
    })))
  }


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
      <Grid container spacing={2}>
        {productOwned.map((product) => {
          return <IndividualProduct product={product} purchaseProduct={purchaseProduct}/>
        })}
      </Grid>
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
export default Products;