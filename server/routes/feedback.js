import { Router } from "express";
const router = Router();
import xss from "xss";
import { createUser, loginByEmailId } from "../data/Auth.js";
import { userSchema, loginSchema } from "../validations/userValidation.js";
import { addFeedback } from "../data/userFeedback.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
// router.route("/").post(async (req, res) => {
//   try {
//     let input = req.body;
//     console.log(input);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

router.route("/").post(async (req, res) => {
  try {
    // console.log("I'm in routes");
    let input = req.body;
    const newFeedback = await addFeedback(input);
    res.status(200).json({ msg: "Feedback added!" });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
