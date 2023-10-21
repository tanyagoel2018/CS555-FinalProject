import { Router } from "express";
const router = Router();
import { getUserByUserID } from "../data/userData.js";

// getting all user data route
router.route("/").get(async (req, res) => {
  try {
    let userId = req.query.id;
    console.log(req.cookies);

    const user = await getUserByUserID(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
