import { Router } from "express";
const router = Router();
import xss from "xss";
import { AdminLoginByEmailId, createAdmin, createUser, loginByEmailId } from "../data/Auth.js";
import { userSchema, loginSchema } from "../validations/userValidation.js";
import { addFeedback } from "../data/userFeedback.js";
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
      maxAge: 43200000, // Cookie expiration time in milliseconds (12 hours)
    });
    res.status(200).json(validUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/AdminLogin").post(async (req, res) => {
  try {
    let input = req.body;
    await loginSchema.validate(input);
    let email = xss(input.email);
    let password = xss(input.password);
    let validUser;
    validUser = await AdminLoginByEmailId(email, password);

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.cookie("jwt", token, {
      httpOnly: true, // Make the cookie accessible not only via HTTP(s)
      maxAge: 43200000, // Cookie expiration time in milliseconds (12 hours)
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

router.route("/logout").get(async (req, res) => {
  let id = xss(req.user.id);
  // TODO: JWT doesnt exist;

  res.cookie("jwt", req.cookies.jwt, {
    httpOnly: true, // Make the cookie accessible not only via HTTP(s)
    maxAge: new Date(Date.now() + 2 * 1000), // Cookie expiration time in milliseconds (2 seconds)
  });
  return res.json({ msg: "token expires in 2 seconds" });
});

//not to be used in frontend
router.route("/createAdmin").post(async(req,res)=>{
  try {
    let input = req.body;
    await loginSchema.validate(input);
    let email = xss(input.email);
    let password = xss(input.password);

    const newUser = await createAdmin(email, password);
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
})

export default router;
