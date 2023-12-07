import { Router } from "express";
import xss from "xss";

const router = Router();

import { completeTask, addNewTask, deleteTask, editTask } from "../data/adminTasks.js";

router.route("/").post(async (req, res) => {
  try {
    let userId = req.body.userId;

    let taskId = req.body.taskId;

    let reward = req.body.reward;

    const user = await completeTask(userId, taskId, reward);
    req.io.to(userId).emit("score:update", {e:"score-update"});
    req.io.to(userId).emit("task:update", {e:"task-update"});

    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});


router.route("/add").post(async (req, res) => {
  //name = req.user.name
  //task = req.body.task
  //rew
  // console.log(req.body);
  try {
    let userId = req.body.userId;

    let name = req.user.name;
    console.log(name);
    let task = req.body.task;

    let reward = req.body.reward;

    const user = await addNewTask(userId, name, task, reward);
    req.io.to(userId).emit("task:update", {e:"task-update"});
    
    return res.json(user);
  } catch (error) {
    console.log(error);
   return res.status(400).json(error);
  }
});

router.route("/edit").post(async (req, res) => {
  // console.log(req.body);
  try {
    let userId = req.body.userId;

    let name = req.user.name;

    let task = req.body.task;

    let reward = req.body.reward;

    let taskId = req.body.taskId;

    const user = await editTask(userId, name, task, reward, taskId);
    req.io.to(userId).emit("task:update", {e:"task-update"});

    res.json(user) ;
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/delete").post(async (req, res) => {

    let userId = xss(req.body.userId);
    let taskId = xss(req.body.taskId);

    userId = userId.trim();
    taskId = taskId.trim();
    try {
        const result = await deleteTask(userId, taskId);
        req.io.to(userId).emit("task:update", {e:"task-update"});
        return res.status(200).json("Task deleted");
      } catch (error) {
        return res.status(404).json("Task not found");
    }
});


export default router;
