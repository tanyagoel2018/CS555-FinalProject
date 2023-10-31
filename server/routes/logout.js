import { Router } from "express";
import logout from "../controllers/Auth.js";
const router = Router();

router.route('/').get(logout);

export default router;