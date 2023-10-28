import { ObjectId } from "mongodb";
import { users } from "../config/dbCollections.js";
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

  const userCollection = await users();
  const result = await userCollection.updateOne(filter, update);


  if (result.modifiedCount === 1) {
    return "Rewards updated succesfully!";
  } else {
    throw "Rewards update failed";
  }
};

export { purchase_product };
