import { ObjectId } from "bson";
import { users } from "../config/dbCollections.js";
import { petSchema } from "../validations/petNameValidations.js";
import { getUserByUserID } from "./userData.js";

const updatePetname = async (id, name) => {

  await petSchema.validate({ petName: name });

  const filter = { _id: new ObjectId(id) };
  const update = { $set: { "pet.petName": name } };

  const userCollection = await users();
  const userExist = await getUserByUserID(id);

  if (name === userExist.pet.petName) {
    throw "New name matches old name!";
  }

  const result = await userCollection.updateOne(filter, update);

  if (result.modifiedCount === 1) {
    return "Pet name updated succesfully!";
  } else {
    throw "Pet name update failed";
  }
};

export { updatePetname };
