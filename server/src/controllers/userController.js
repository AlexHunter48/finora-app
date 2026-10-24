import userModel from "../models/userModel";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return res.status(500).json({
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};
