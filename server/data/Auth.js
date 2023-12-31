import { admin, users } from "../config/dbCollections.js";
import bcrypt from "bcrypt";
import { userSchema, loginSchema } from "../validations/userValidation.js";
const saltRounds = 10;

// this function creates new user in mongodb

const createUser = async (email, password, name, age) => {
  email = email.trim().toLowerCase();
  name = name.trim();
  password = password.trim();
  age = Number(age);
  await userSchema.validate({ email, password, name, age });

  let hash = await bcrypt.hash(password, saltRounds);
  const userCollection = await users();
  const userExist = await userCollection.findOne({
    email: email,
  });

  if (userExist != null) {
    if (userExist.email.toLowerCase() === email.toLowerCase()) {
      throw "user with that email already exists";
    }
  }

  let newUser = {
    email: email,
    password: hash,
    name: name,
    age: age,
    profilePic: null,
    rewards: 0,
    tasks: [],
    pet: {
      petName: null,
      recentImage:
        "https://drive.google.com/uc?id=19TaLFV4x1-cffVenWIKIjYK2LMNs1Grf",
    },
    products: ["65710e5ff59aab16fe506557"],
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Error : Could not add user";
  }
  return "Registration successful";
};

const createAdmin = async (email, password, name) => {
  email = email.trim().toLowerCase();
  password = password.trim();
  name = name.trim();
  await loginSchema.validate({ email, password });

  let hash = await bcrypt.hash(password, saltRounds);
  const adminCollection = await admin();
  const userExist = await adminCollection.findOne({
    email: email,
  });

  if (userExist != null) {
    if (userExist.email.toLowerCase() === email.toLowerCase()) {
      throw "admin with that email already exists";
    }
  }

  let newUser = {
    email: email,
    password: hash,
    name: name,
  };

  const insertInfo = await adminCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Error : Could not add admin";
  }
  return "Registration successful";
};

const loginByEmailId = async (email, password) => {
  email = email.trim().toLowerCase();
  password = password.trim();
  await loginSchema.validate({ email, password });

  const userCollection = await users();
  const userExist = await userCollection.findOne({
    email: email,
  });

  if (userExist == null) {
    throw "Invalid email ID or password!";
  }

  const validPass = await bcrypt.compare(password, userExist.password);

  if (!validPass) {
    throw "Invalid email ID or password!";
  }

  userExist._id = userExist._id.toString();
  return { id: userExist._id, email: userExist.email, name: userExist.name };
};

const AdminLoginByEmailId = async (email, password) => {
  email = email.trim().toLowerCase();
  password = password.trim();
  await loginSchema.validate({ email, password });

  const adminCollection = await admin();
  const userExist = await adminCollection.findOne({
    email: email,
  });

  if (userExist == null) {
    throw "Invalid email ID or password!";
  }

  const validPass = await bcrypt.compare(password, userExist.password);

  if (!validPass) {
    throw "Invalid email ID or password!";
  }

  userExist._id = userExist._id.toString();
  return { id: userExist._id, email: userExist.email, name: userExist.name };
};

// Add new code from here

export { createAdmin, AdminLoginByEmailId, createUser, loginByEmailId };
