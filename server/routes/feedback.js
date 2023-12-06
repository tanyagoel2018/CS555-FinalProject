import { Router } from "express";
const router = Router();
import { addFeedback } from "../data/userFeedback.js";
import "dotenv/config.js";
import { feedbackSchema } from "../validations/feedbackValidation.js";

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
