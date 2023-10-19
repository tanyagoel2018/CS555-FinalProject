import { users } from "../config/dbCollections.js";
import { ObjectId } from "mongodb";

const getUserByUserID = async (id) => {
  const userCollection = await users();
  const userExist = await userCollection.findOne({
    _id: new ObjectId(id),
  });

  if (userExist == null) {
    throw "Invalid session ID!";
  }

  userExist._id = userExist._id.toString();
  return userExist;
};

export { getUserByUserID };
