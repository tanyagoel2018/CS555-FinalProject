import {addProductToUser, getAllProducts, getProductById} from "../data/products.js";
import xss from "xss";
import { getUserByUserID } from "../data/userData.js";
import { products, users } from "../config/dbCollections.js";

const purchaseProduct = async( req, res)=>{
    let id = xss(req.user.id);
    let productId = xss(req.body.productId);
    if (id == undefined){
        return res.status(400).json({error:"please log in"});
    }

    let userData = undefined;
    // get user data;
    try {
         userData = getUserByUserID(id)
    } catch (error) {
        console.log(id);
    }
    const userProducts = userData.products;

    //if you already own it.
    for (const productOwned of userProducts){
        if (productOwned== productId){
            return res.json({msg: "You already own it"});
        }
    }

    //Can you afford it
    const reward = userData.rewards;
    let product = undefined;

    try {
        product = await getProductById(productId);
    } catch (error) {
        console.log(error);
    }

    if (reward<product.points){
        return res.json({msg:"insufficient funds"});
    } 
    

    //add product to user;
    try {
        await addProductToUser(id, productId, reward-product.points);
    } catch (error) {
        console.log(error);
    }
    return res.json("Purchase Successful");
}

const getPurchasableProducts = async(req, res)=>{

    let userData = undefined;
    let allProducts = undefined;
    let purchasableProdcut = [];

    try {
        userData = await getUserByUserID(req.user.id);
        allProducts = await getAllProducts();
    } catch (error) {
        console.log(error);
    }

    for (const prod of allProducts){
        for (const userProduct of userData.products){
            if (userProduct == prod._id){
                break;
            }
        }
        purchasableProdcut.push(prod);
    }
    console.log(purchasableProdcut);
    return res.json({products: purchasableProdcut});
}

export {purchaseProduct, getPurchasableProducts}