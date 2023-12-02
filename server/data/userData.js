import { users } from "../config/dbCollections.js";
import { ObjectId } from "mongodb";


const getAllUsers = async () => {
  const userCollection = await users();
  const usersExist = await userCollection.find({}).toArray();

  if (!usersExist) {
    throw "Could Not get all Users";
  }
  usersExist.forEach(user => {
    user._id = user._id.toString(); 
  });

  return usersExist;
};

const getUserByName = async(searchQuery)=>{
  const userCollection = await users();
  const regex = new RegExp(searchQuery,"i");
  const results = await userCollection.find({name:{$regex:regex}})
  console.log(results);
  results.forEach(user => {
    user._id = user._id.toString(); 
  });

  return results;
}

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

const updateProfilePic = async(id,url)=>{
  const filter = { _id: new ObjectId(id) };
  const update = { $set: { "profilePic": url } };

  const userCollection = await users();
  const userExist = await getUserByUserID(id);

  const result = await userCollection.updateOne(filter, update);

  if (result.modifiedCount === 1) {
    return "Profile Picture updated succesfully!";
  } else {
    throw "Profile Picture update failed";
  }
}

export { getUserByName,getAllUsers,getUserByUserID, updateProfilePic,setNewOutfit };
 