import axios from "axios";
import { getMonoTransactions } from "../../utils/monoApi.js";
import { runSubscriptionDetectionEngine } from "../../utils/subscriptionDetector.js";

export const transactions = async (req, res) => {
  try {
    const userAccounts = req.user.monoAccountId;
    const requestedAccountId = req.query.monoAccountId;
    const userId = req.user._id || req.user.id;
    if (!userAccounts || userAccounts.length === 0) {
      return res.status(400).json({ message: "No linked bank accounts found" });
    }

    const activeAccountId = requestedAccountId || userAccounts[0];

    if (!userAccounts.includes(activeAccountId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this account" });
    }

    const monoTransactions = await getMonoTransactions(activeAccountId);

    const detectedSubscriptions = await runSubscriptionDetectionEngine(
      userId,
      monoTransactions,
    );

    return res.status(200).json({
      success: true,
      transactions: monoTransactions,
      detectedCount: detectedSubscriptions.length,
      subscriptions: detectedSubscriptions,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error getting transactions:", errorMessage);

    return res.status(500).json({
      message: "Error getting transactions",
      error: errorMessage,
    });
  }
};
