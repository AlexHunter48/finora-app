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
    console.log(updatedUser);
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
