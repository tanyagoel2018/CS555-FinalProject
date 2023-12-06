import React, { useEffect, useState } from "react";
import { useApi } from "../ContextAPI/APIContext";
import CustomSnackbar from "./CustomSnackbar";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Paper, Fab, Box, Stack,
} from "@mui/material";
import { IoCartOutline } from "react-icons/io5";

import useSnackbar from "../hooks/useSnackbar";
import { LuDog } from "react-icons/lu";
import { FaTshirt } from "react-icons/fa";
import OutFits from "../modals/OutFits";
import BackDrop from "./Backdrop";

const Products = (props) => {
  const [rewards, setRewards] = useState(props.rewards);
  const snackbar = useSnackbar();
  const {restAPI} = useApi();
  const [products, setProducts] = useState(null);
  const [productOwned, setProductOwned] = useState(null);
  const [transaction, setTransaction] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const {reload, reloadParent} = props;
  const navigate = useNavigate();

  const fetchAllProducts = async()=>{
    try {
      const response = await restAPI.get("/protected/products");
      setProducts(response.data.products);
    } catch (error) {
      if (error.response.status === 403){
        localStorage.removeItem("Are_you_in");
        navigate("/");
      }
    }
  
  }

  const fetchMyProducts = async()=>{
    try {
      const response = await restAPI.get("/protected/products/myProducts");
      setProductOwned(response.data.products);
    } catch (error) {
      if (error.response.status === 403){
        localStorage.removeItem("Are_you_in");
        navigate("/");
      }
    }

  }

  const handleOpenModal = ()=>{
    setModalOpen(true);
  }
  const handleCloseModal = ()=>{
    setModalOpen(false);
  }

  useEffect(()=>{
    setLoader(true);
    try {
      fetchAllProducts();
    } catch (error) {
      snackbar.showError("Couldn't load store products")
    }

    try {
      fetchMyProducts();
    } catch (error) {
      snackbar.showError("Couldn't load personal products")
    }
    setLoader(false);
  },[transaction])

  const handlePurchaseProduct = async (id, points) => {
    let response = undefined;
    try {
      response = await restAPI.post("/protected/products", {
        productId: id,
      });
      setRewards(rewards - points);
      snackbar.showSuccess("Purchase Successfull!");
      setTransaction(!transaction);
      reloadParent(reload+1);
    } catch (error) {
      if (error.response.status === 403){
        localStorage.removeItem("Are_you_in");
        navigate("/");
      }
      if (error && error.response && error.response.data) {
        snackbar.showError(error.response.data || "Something went wrong");
      }
    }
  };
  if(loader){
    return BackDrop(loader={loader});
  }

>>>>>>> 46f56de (websocket implemented)
  return (
    <div className="center">
      <Stack direction={"row"} paddingBlockStart={4} paddingBlockEnd={2}>
        <IoCartOutline size={"1.8em"}/>
        <Typography variant="h5">Store</Typography>
      </Stack>

      <Grid container spacing={2} paddingLeft={2} overflow="auto" maxHeight={"25em"}>
        {products && products.map((product) => {
          return <IndividualProduct product={product} handlePurchaseProduct={handlePurchaseProduct}/>
        })}
      </Grid>
    
      <CustomSnackbar snackbarProp={snackbar} />

      <Fab onClick={handleOpenModal} sx= {{  
        position: 'absolute',
        bottom: 45,
        left: 30, 
        bgcolor: "#2C579C",
        '&:hover': {bgcolor: "#244882"},
        width:"75px",
        height:"75px",
        }}>
          <LuDog size={35} color={"#fafafa"}/> 
        </Fab>
        {/* {productOwned &&  */}
        <OutFits open={modalOpen} handleClose = {handleCloseModal} productOwned ={productOwned} gif = {props.gif} reloadParent={reloadParent} reload = {reload}/>
        {/* } */}
    </div>
  
  );
};

const IndividualProduct = ({ handlePurchaseProduct, product }) => {
  const { name, points, img, cardImg, _id, own } = product;

  let color = "#ebebeb";
    return (
        <Grid item xs={6}>
        <Card sx={{ maxWidth: 345}}>
          <CardActionArea onClick={() =>handlePurchaseProduct(_id, points)}>
            <CardMedia
              component="img"
              height="140"
              image= {cardImg}
              alt="green iguana"
            />
            <CardContent sx={{backgroundColor:color}}>
              <Typography>{name}</Typography>
              <Typography>{points} points</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
}


export default Products;
