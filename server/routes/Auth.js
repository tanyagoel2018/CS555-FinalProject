import { Router } from "express";
const router = Router();
import xss from "xss";
import { createUser, loginByEmailId } from "../data/Auth.js";
import { userSchema, loginSchema } from "../validations/userValidation.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

//login route
router.route("/login").post(async (req, res) => {
  try {
    let input = req.body;
    await loginSchema.validate(input);
    let email = xss(input.email);
    let password = xss(input.password);
    let validUser;
    validUser = await loginByEmailId(email, password);

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.cookie("jwt", token, {
      httpOnly: true, // Make the cookie accessible not only via HTTP(s)
      maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
    });
    res.status(200).json(validUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// signup route
router.route("/sign-up").post(async (req, res) => {
  try {
    let input = req.body;
    await userSchema.validate(input);
    let email = xss(input.email);
    let password = xss(input.password);
    let name = xss(input.name);
    let age = xss(input.age);

    const newUser = await createUser(email, password, name, Number(age));
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
