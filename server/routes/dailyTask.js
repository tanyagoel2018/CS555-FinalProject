import { Router } from "express";
import { getDailyTask } from "../controllers/dailyTask.js";

const router = Router();

router.route('/daily-task').get(getDailyTask);

export default router;