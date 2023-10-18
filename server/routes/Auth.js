import { Router } from "express";
const router = Router();
import xss from "xss";
import { createUser, loginByEmailId } from "../data/Auth.js";
import { userSchema, loginSchema } from "../validations/userValidation.js";

//login route
router.route("/login").post(async (req, res) => {
  try {
    let input = req.body;
    await loginSchema.validate(input, { abortEarly: false });
    let email = xss(input.email);
    let password = xss(input.password);

    let validUser;
    validUser = await loginByEmailId(email, password);
    res.json(validUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// signup route
router.route("/sign-up").post(async (req, res) => {
  try {
    let input = req.body;
    await userSchema.validate(input, { abortEarly: false });
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
