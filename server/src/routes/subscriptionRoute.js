import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  importBankStatement,
  runMockDetection,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getSubscriptions)
  .post(protect, createSubscription);

router.route("/:id").delete(protect, deleteSubscription);

router.post("/mock-detect", protect, runMockDetection);

router.post("/import-statement", protect, importBankStatement);

export default router;
