import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Alert,
  Snackbar
} from "@mui/material";
import { useApi } from "../ContextAPI/APIContext";

const Products = (props) => {
  const [rewards, setRewards] = useState(props.rewards);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something gone wrong");
  const {restAPI} = useApi();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSuccess(false);
  };

  const purchaseProduct = async (points, image) => {
    const values = {
      rewards: points,
      image: image,
    };

    restAPI
      .post("/protected/products", values)
      .then(() => {
        setRewards(rewards - points);
        setSuccess(true);
        props.reloadParent(props.reload + 1);
      })
      .catch((error) => {
        setError(true);
        if (error && error.response && error.response.data) {
          setErrorMsg(error.response.data);
        }
      });
  };
  return (
    <div className="center">
      <h2>Products</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea
              onClick={() =>
                purchaseProduct(
                  100,
                  "https://images.pexels.com/photos/7209396/pexels-photo-7209396.jpeg"
                )
              }
            >
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/7209396/pexels-photo-7209396.jpeg"
                alt="green iguana"
              />
              <CardContent>
                <Typography>Meat</Typography>
                <Typography>100 Points</Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions style={{justifyContent:'center'}}>
              <Button size="small" color="primary">
                100
              </Button>
            </CardActions> */}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea
              onClick={() =>
                purchaseProduct(
                  200,
                  "https://images.pexels.com/photos/7209396/pexels-photo-7209396.jpeg"
                )
              }
            >
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/7209396/pexels-photo-7209396.jpeg"
                alt="green iguana"
              />
              <CardContent>
                <Typography>Orange Hat</Typography>
                <Typography>200 Points</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea
              onClick={() =>
                purchaseProduct(
                  250,
                  "https://images.pexels.com/photos/7209396/pexels-photo-7209396.jpeg"
                )
              }
            >
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/7209396/pexels-photo-7209396.jpeg"
                alt="green iguana"
              />
              <CardContent>
                <Typography>Yellow Jacket</Typography>
                <Typography>250 Points</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea
              onClick={() =>
                purchaseProduct(
                  300,
                  "https://images.pexels.com/photos/7209396/pexels-photo-7209396.jpeg"
                )
              }
            >
              <CardMedia
                component="img"
                height="140"
                image="https://images.pexels.com/photos/7209396/pexels-photo-7209396.jpeg"
                alt="green iguana"
              />
              <CardContent>
                <Typography>Googles</Typography>
                <Typography>300 Points</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Purchase Successfull!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg}!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Products;
