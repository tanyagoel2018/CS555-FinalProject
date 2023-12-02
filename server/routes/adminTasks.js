import { Router } from "express";
const router = Router();

import { completeTask } from "../data/adminTasks.js";


router.route("/").post(async (req, res) => {
    try {
      let userId = req.body.userId;
      let taskId = req.body.taskId;
      let reward = req.body.reward;
  
      const user = await completeTask(userId,taskId,reward);
      res.json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  });

export default router;
