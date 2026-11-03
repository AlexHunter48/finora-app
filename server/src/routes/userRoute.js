import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getCurrentUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/user", protect, getCurrentUser);

export default router;
