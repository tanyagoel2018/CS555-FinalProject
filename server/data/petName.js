import { ObjectId } from "bson";
import { users } from "../config/dbCollections.js";
import { petSchema } from "../validations/petNameValidations.js";

const fetchPetName = async (id) => {
  //TODO: Input validation for ID.
  const idSchema = yup
    .string()
    .matches(
      /^[A-Za-z0-9_]+$/,
      "ID should contain only letters, numbers, and underscores"
    );
  try {
    await idSchema.validate(id);
    // The ID is valid; proceed with fetching the pet name.
    // Your fetching logic goes here.
  } catch (error) {
    console.error("Validation Error:", error.message);
    // Handle the validation error, e.g., return an error response or throw an exception.
  }
  //TODO: fetch pet info based on user ID.

  //TODO: return dog name
};

const addPetName = async (id, name) => {
  //TODO: Input validation for ID and name.
  const idSchema = yup
    .string()
    .matches(
      /^[A-Za-z0-9_]+$/,
      "ID should contain only letters, numbers, and underscores"
    );
  const nameSchema = yup
    .string()
    .required()
    .min(3, "Name should be at least 3 characters long");

  //TODO: add petname in the DB for user ID
  try {
    await idSchema.validate(id);
    await nameSchema.validate(name);

    // const userExist = await userCollection.findOne({
    //   _id: new Object(id),
    // });

    // if (userExist == null) {
    //   throw "No user with this ID add!";
    // }

    // Insert the pet name into the collection.
    const result = await users.insertOne({ userId: id, petName: name });

    //TODO Return the added dog name.
    return result.ops[0].petName;
  } catch (error) {
    console.error("Validation or Database Error:", error.message);
  }
};

const updatePetname = async (id, name) => {
  //TODO: Input validation for ID and name.
  // const idSchema = yup
  //   .string()
  //   .matches(
  //     /^[A-Za-z0-9_]+$/,
  //     "ID should contain only letters, numbers, and underscores"
  //   );
  // const nameSchema = yup
  //   .string()
  //   .required()
  //   .min(3, "Name should be at least 3 characters long");

  // await idSchema.validate(id);
  // await nameSchema.validate(name);
  await petSchema.validate({ petName: name });

  const filter = { _id: new ObjectId(id) };
  const update = { $set: { "pet.petName": name } };

  const userCollection = await users();
  const userExist = await userCollection.findOne(filter);

  if (userExist == null) {
    throw "No user with this ID!";
  }

  if (name === userExist.pet.petName) {
    throw "New name matches old name!";
  }

  const result = await userCollection.updateOne(filter, update);

  if (result.modifiedCount === 1) {
    return "Pet name updated succesfully!";
  } else {
    throw "Pet name update failed";
  }

  //TODO: update petname in the DB for user ID
  //TODO: return updated dog name
};

export { fetchPetName, addPetName, updatePetname };
