import express from "express";

import {
  googleAuth,
  loginUser,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/google", googleAuth);

router.post("/login", loginUser);

export default router;
