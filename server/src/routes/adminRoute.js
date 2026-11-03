import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { runWatchdogCheck } from "../jobs/renewalWatchdog.js";

const router = express.Router();

router.post("/test-watchdog", protect, async (req, res) => {
  try {
    console.log(` Manual watchdog test triggered by user: ${req.user._id}`);
    const result = await runWatchdogCheck();

    return res.status(200).json({
      message: "Watchdog executed successfully!",
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Watchdog test failed",
      error: error.message,
    });
  }
});

export default router;
