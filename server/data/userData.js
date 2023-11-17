import { users } from "../config/dbCollections.js";
import { ObjectId } from "mongodb";

const getUserByUserID = async (id) => {
  const userCollection = await users();
  const userExist = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  if (userExist == null) {
    throw "Invalid ID!";
  }

  userExist._id = userExist._id.toString();
  return userExist;
};

const setNewOutfit = async(userId, image)=>{
  const userCollection = await users();
  const filter = { _id: new ObjectId(userId) };

  const update = { $set: { "pet.recentImage" : image } };
  const result = await userCollection.updateOne(filter, update);
  if (result.modifiedCount === 1) {
    return "Rewards updated succesfully!";
  } else {
    throw "Rewards update failed";
  }
}

export { getUserByUserID,setNewOutfit };
 