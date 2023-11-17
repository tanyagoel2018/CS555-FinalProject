import { ObjectId } from "mongodb";
import { users, products } from "../config/dbCollections.js";
import { getUserByUserID } from "./userData.js";
import { productUpdateSchema } from "../validations/productValidation.js";

const purchase_product = async (id, rewards,image) => {
  let userData = await getUserByUserID(id);
  const newReward = userData.rewards - rewards;
  if(newReward<0){
    throw "Insufficient Rewards";
  }
  await productUpdateSchema.validate({rewards, image})

  const filter = { _id: new ObjectId(id) };

  const update = { $set: { rewards: Number(newReward), "pet.recentImage" : image } };
  // const update= { $push: { products: id } }
  const userCollection = await users();
  const result = await userCollection.updateOne(filter, update);

  if (result.modifiedCount === 1) {
    return "Rewards updated succesfully!";
  } else {
    throw "Rewards update failed";
  }
};

const getAllProducts = async()=>{
  const productCollection = await products();  
  let result = undefined;
      result = await productCollection.find({}).toArray();
      result = result.map((product)=>{
          product._id = product._id.toString();
          return product;
      })

    result = result.map((prod)=>{
      prod._id = prod._id.toString();
      return prod;
    })

    return result;
}

const getProductById = async(id)=>{
    const productCollection = await products();  
    let result = undefined;
 
      result = await productCollection.findOne({_id: new ObjectId(id)});
      result._id = result._id.toString();
   
    return result;
}

const addProductToUser = async (userId, productId, reward)=>{
  const userCollection = await users();  
  let result = undefined;
 
    result = await userCollection.updateOne({_id: new ObjectId(userId)}, { $push: { products: productId}, $set: { rewards: Number(reward)}});
    // result._id = result._id.toString();
 
  return result;
}

const myProducts = async(id)=>{
  const productCollection = await products();

  let productsOwned = undefined;
  
  try {
    let userData = await getUserByUserID(id);
    let productIds = userData.products;
    productIds = productIds.map((id) =>{
          return new ObjectId(id);
    });

    productsOwned = await productCollection.find({_id: {$in: productIds}}).toArray();
    productsOwned = productsOwned.map((product)=>{
      product._id = product._id.toString();
      return product;
    })

  } catch (error) {
    console.log(error);
  }
  return productsOwned;
}



export { purchase_product, getAllProducts, addProductToUser, getProductById, myProducts };
