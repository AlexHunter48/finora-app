import { runSubscriptionDetectionEngine } from "../../utils/subscriptionDetector.js";
import subscriptionsModel from "../models/subscriptionsModel.js";

export const getSubscriptions = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const subscriptions = await subscriptionsModel
      .find({ userId, status: "active" })
      .sort({ dueDate: 1 });

    return res.status(200).json({
      success: true,
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({
      message: "Server error fetching subscriptions",
      error: error.message,
    });
  }
};

export const createSubscription = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { name, category, amount, currency, frequency, dueDate } = req.body;

    if (!name || !amount || !dueDate || !category) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newSubscription = await subscriptionsModel.create({
      userId,
      name,
      category,
      amount,
      currency: currency || "NGN",
      frequency: frequency || "monthly",
      dueDate,
    });

    return res.status(201).json({
      success: true,
      subscription: newSubscription,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return res.status(500).json({
      message: "Server error creating subscription",
      error: error.message,
    });
  }
};

export const deleteSubscription = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { id } = req.params;

    const subscription = await subscriptionsModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return res.status(500).json({
      message: "Server error deleting subscription",
      error: error.message,
    });
  }
};
export const runMockDetection = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const mockTransactions = [
      {
        narration: "WEB PURCHASE OPENAI CHATGPT PLUS USD",
        amount: -30000,
        date: new Date(),
      },
      {
        narration: "GITHUB COPILOT SUBSCRIPTION USD",
        amount: -15000,
        date: new Date(),
      },
      {
        narration: "VERCEL PRO DEPLOYMENT PLAN",
        amount: -32000,
        date: new Date(),
      },
      {
        narration: "AWS INFRASTRUCTURE BILL",
        amount: -45000,
        date: new Date(),
      },
      {
        narration: "WEB PURCHASE NETFLIX LAGOS NGA",
        amount: -5000,
        date: new Date(),
      },
    ];

    const detectedSubscriptions = await runSubscriptionDetectionEngine(
      userId,
      mockTransactions,
    );

    return res.status(200).json({
      success: true,
      message: "Developer mock detection ran successfully",
      count: detectedSubscriptions.length,
      subscriptions: detectedSubscriptions,
    });
  } catch (error) {
    console.error("Error in mock detection:", error);
    return res.status(500).json({
      message: "Server error running mock detection",
      error: error.message,
    });
  }
};

export const handleRealBankSync = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    const realTransactions = await fetchMonoTransacti0ns(userId);

    const detectedSubscriptions = await runSubscriptionDetectionEngine(
      userId,
      realTransactions,
    );

    return res.status(200).json({
      success: true,
      message: "Bank synced and subscriptions auto-detected successfully",
      count: detectedSubscriptions.length,
      subscriptions: detectedSubscriptions,
    });
  } catch (error) {
    console.error("Error in real bank sync:", error);
    return res
      .status(500)
      .json({ message: "Server error syncing bank", error: error.message });
  }
};
