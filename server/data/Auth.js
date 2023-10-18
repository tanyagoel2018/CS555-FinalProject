import {users} from '../config/dbCollections.js'
import bcrypt from 'bcrypt';
import { userSchema } from '../validations/userValidation.js';
const saltRounds = 10;

// this function creates new user in mongodb

const createUser = async(email,password,name,age)=>{
    email = email.trim().toLowerCase();
    name = name.trim();
    password = password.trim();
    age = Number(age);
    await userSchema.validate({email,password,name,age});

    let hash = await bcrypt.hash(password, saltRounds);
    const userCollection = await users();
    const userExist = await userCollection.findOne({
      email: email
    });

    if(userExist!=null){
        if(userExist.email.toLowerCase()===email.toLowerCase()){
          throw "user with that email already exists";
        }
      }

    let newUser = {
        email:email,
        password:hash,
        name:name,
        age:age,
        rewards:0,
        tasks:[],
        pet:{
          petName:null,
          recentImage:null
        }
    }

    const insertInfo = await userCollection.insertOne(newUser);
      if (!insertInfo.acknowledged || !insertInfo.insertedId){
        throw 'Error : Could not add user';
      }
    return 'Registration successful';
}

// Add new code from here









export {createUser}