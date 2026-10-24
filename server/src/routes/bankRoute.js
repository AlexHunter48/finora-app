import express from "express";

import { connectBank, unlinkAccount } from "../controllers/bankController.js";
import { transactions } from "../controllers/transactionsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/transactions", protect, transactions);
router.post("/connect", protect, connectBank);
router.post("/unlink", protect, unlinkAccount);

export default router;
