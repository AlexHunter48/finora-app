import axios from "axios";
import userModel from "../models/userModel.js";

export const connectBank = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "Auth code is required" });
    }

    const response = await axios.post(
      "https://api.withmono.com/v2/accounts/auth",
      { code },
      {
        headers: {
          "mono-sec-key": process.env.MONO_SECRET_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    const accountId = response.data.data.id;

    const user = userModel.findById(req.user.id);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { monoAccountId: accountId } },
      { returnDocument: "after" },
    );

    res.status(200).json({
      success: true,
      message: "Bank account linked successfully",
      accountId,
    });
  } catch (error) {
    console.error(
      "Mono Exchange Error:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      success: false,
      message: "Failed to link bank account",
    });
  }
};

export const unlinkAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const { accountId } = req.body;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userIds = user?.monoAccountId || [];

    if (!userIds.includes(accountId)) {
      return res
        .status(401)
        .json({ message: "User is unauthorized to perform this action" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { monoAccountId: accountId } },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      message: "Account unlinked successfully",
      monoAccountId: updatedUser.monoAccountId,
    });
  } catch (error) {
    console.error("Error unlinking account:", error);
    return res.status(500).json({
      message: "Error unlinking account",
      error: error.message,
    });
  }
};
