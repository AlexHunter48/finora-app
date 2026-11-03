import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  runMockDetection,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getSubscriptions)
  .post(protect, createSubscription);

router.route("/:id").delete(protect, deleteSubscription);

router.post("/mock-detect", protect, runMockDetection);

export default router;
