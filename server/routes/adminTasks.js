import { Router } from "express";
const router = Router();

import { completeTask, addNewTask } from "../data/adminTasks.js";

router.route("/").post(async (req, res) => {
  try {
    let userId = req.body.userId;

    let taskId = req.body.taskId;

    let reward = req.body.reward;

    const user = await completeTask(userId, taskId, reward);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/add").post(async (req, res) => {
  //name = req.user.name
  //task = req.body.task
  //rew
  console.log(req.body);
  try {
    let userId = req.body.userId;

    let name = req.user.name;
    console.log(name);
    let task = req.body.task;

    let reward = req.body.reward;

    const user = await addNewTask(userId, name, task, reward);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
