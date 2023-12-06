import {
  addProductToUser,
  getAllProducts,
  getProductById,
  myProducts,
} from "../data/products.js";
import xss from "xss";
import { getUserByUserID, setNewOutfit } from "../data/userData.js";

const purchaseProduct = async (req, res) => {
  let id = xss(req.user.id);
  let productId = xss(req.body.productId);

  if (id == undefined) {
    return res.status(403).json("Please Log In");
  }
  if (productId == undefined) {
    return res.status(400).json("Product ID needed");
  }
  let userData = undefined;
  // get user data;
  try {
    userData = await getUserByUserID(id);
  } catch (error) {
    return res.status(400).json("Sorry, please try again later");
  }
  const userProducts = userData.products;

  // if you already own it.
  // for (let productOwned of userProducts){
  //     if (productOwned){
  //         if (productOwned === productId){
  //             return res.status(200).json({msg: "You already own it"});
  //         }
  //     }
  // }

  //Can you afford it
  const reward = userData.rewards;
  let product = undefined;

  try {
    product = await getProductById(productId);
  } catch (error) {
    return res.status(400).json("Sorry, please try again later");
  }

  if (reward < product.points) {
    return res
      .status(400)
      .json("Insufficient points. Complete Daily task to gain points");
  }

  //add product to user;
  try {
    await addProductToUser(id, productId, reward - product.points);
  } catch (error) {
    return res.status(400).json("Sorry, please try again later");
  }
  return res.json("Purchase Successful");
};

const getPurchasableProducts = async (req, res) => {
  let userData = undefined;
  let allProducts = undefined;
  let purchasableProdcut = [];
  let userID = xss(req.user.id);
  userID = userID.trim();

  try {
    userData = await getUserByUserID(userID);
    allProducts = await getAllProducts();
  } catch (error) {
    return res.status(400).json("Sorry, no product found");
  }

  for (const prod of allProducts) {
    let present = false;
    for (const userProduct of userData.products) {
      if (userProduct == prod._id) {
        present = true;
        break;
      }
    }
    if (!present) purchasableProdcut.push(prod);
  }

  return res.json({ products: purchasableProdcut });
};

const getMyProducts = async (req, res) => {
  let id = xss(req.user.id);
  let products = undefined;

  try {
    products = await myProducts(id);
  } catch (error) {
    console.log(error);
  }
  res.json({ products });
};

const updateOutfit = async (req, res) => {
  let id = xss(req.user.id);
  let img = xss(req.body.img);
  id = id.trim();
  img = img.trim();

  try {
    await setNewOutfit(id, img);
  } catch (error) {
    return res.status(400).json("Sorry, please try again later");
  }
  return res.status(200).json("Success");
};

export { purchaseProduct, getPurchasableProducts, getMyProducts, updateOutfit };
