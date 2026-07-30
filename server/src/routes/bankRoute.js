import express from "express";

import { connectBank } from "../controllers/bankController.js";
import { transactions } from "../controllers/transactionsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/transactions", protect, transactions);
router.post("/connect", protect, connectBank);

export default router;
