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
  Paper,
} from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";

const Products = (props) => {
  const [rewards, setRewards] = useState(props.rewards);
  const snackbar = useSnackbar();
  const { restAPI } = useApi();
  const [products, setProducts] = useState([]);
  const [productOwned, setProductOwned] = useState([]);
  const [transaction, setTransaction] = useState(false);
  const { updateGif } = props;
  const [outfit, setOutfit] = useState({
    Collar: false,
    Milk: false,
    "Brown Hat": false,
    "Red sweater": false,
  });
  const fetchAllProducts = async () => {
    let response = undefined;
    try {
      response = await restAPI.get("/protected/products");
      const response2 = await restAPI.get("/protected/products/myProducts");
      setProducts(response.data.products);
      setProductOwned(response2.data.products);
    } catch (error) {
      snackbar.showError("Products are feeling shy to show up");
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [transaction]);

  const handlePurchaseProduct = async (id, points) => {
    let response = undefined;
    try {
      response = await restAPI.post("/protected/products", {
        productId: id,
      });
      setRewards(rewards - points);
      snackbar.showSuccess("Purchase Successfull!");
      setTransaction(!transaction);
    } catch (error) {
      if (error && error.response && error.response.data) {
        snackbar.showError(error.response.data || "Something went wrong");
      }
    }
  };

  const [toggle, setToggle] = useState(true);

  const handleSaveOutfit = async () => {
    try {
      let img = undefined;
      if (
        props.gif ==
        "https://drive.google.com/uc?export=download&id=1xHY9h6o7P4UbIk22R7wQJpVTocPzOtnD"
      ) {
        img =
          "https://drive.google.com/uc?export=download&id=1fyDSj1BJyEnafSYnIZDXVXF1hQv6GjKy";
      } else {
        img =
          "https://drive.google.com/uc?export=download&id=1xHY9h6o7P4UbIk22R7wQJpVTocPzOtnD";
      }

      setToggle(!toggle);
      let response = await restAPI.post("/protected/products/myProducts", {
        img: img,
      });
      updateGif(img);
      snackbar.showSuccess("Outfit updated!");
    } catch (error) {
      snackbar.showError("Couldn't update outfit!");
    }
  };

  console.log(outfit);
  return (
    <div className="center">
      <h2>Store</h2>
      <Grid container spacing={2}>
        {products.map((product) => {
          return (
            <IndividualProduct
              product={product}
              handlePurchaseProduct={handlePurchaseProduct}
            />
          );
        })}
      </Grid>
      <h2>My Products</h2>
      <Grid container spacing={2} marginBottom={2}>
        {productOwned.map((product) => {
          return (
            <MyProducts
              product={product}
              outfit={outfit}
              setOutfit={setOutfit}
            />
          );
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

const IndividualProduct = ({ handlePurchaseProduct, product }) => {
  const { name, points, img, cardImg, _id, own } = product;

  let color = "#d9dbd7";
  return (
    <Grid item xs={6}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => handlePurchaseProduct(_id, points)}>
          <CardMedia
            component="img"
            height="140"
            image={cardImg}
            alt="green iguana"
          />
          <CardContent sx={{ backgroundColor: color }}>
            <Typography>{name}</Typography>
            <Typography>{points} points</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
const MyProducts = ({ product, setOutfit, outfit }) => {
  const [selected, setSelected] = useState(true);
  const { name, img, cardImg, _id } = product;
  const getName = () => name;
  const handleClick = () => {
    if (!selected) {
      setSelected(!selected);
      setOutfit((outfit) => ({ ...outfit, name: true }));
    }
    setSelected(!selected);
    setOutfit((outfit) => ({ ...outfit, name: false }));
  };

  let color = selected ? "#d1fcae" : "#d9dbd7";

  return (
    <Grid item xs={6}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height="140"
            image={cardImg}
            alt="green iguana"
          />
          <CardContent sx={{ backgroundColor: color }}>
            <Typography>{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default Products;
