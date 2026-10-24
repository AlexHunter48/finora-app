import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getCurrentUser } from "../controllers/userController";

const router = express.Router();

router.get("/user", protect, getCurrentUser);

export default router;
