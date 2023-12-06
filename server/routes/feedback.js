import { Router } from "express";
const router = Router();
import {
  addFeedback,
  getAllFeedbacksWithUserId,
} from "../data/userFeedback.js";
import "dotenv/config.js";
import { feedbackSchema } from "../validations/feedbackValidation.js";

router.route("/").get(async (req, res) => {
  try {
    let userId = req.user.id;
    const allFeedbacks = await getAllFeedbacksWithUserId(userId);
    return res.status(200).json(allFeedbacks);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/").post(async (req, res) => {
  try {
    let input = req.body.feedback;
    let userId = req.user.id;
    await feedbackSchema.validate({ feedback: input });
    const newFeedback = await addFeedback(userId, input);
    res.status(200).json({ msg: "Feedback added!" });
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
