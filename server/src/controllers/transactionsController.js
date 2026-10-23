import axios from "axios";

export const transactions = async (req, res) => {
  try {
    const userAccounts = req.user.monoAccountId;
    const requestedAccountId = req.query.monoAccountId; // 👈 Get ID from query params

    if (!userAccounts || userAccounts.length === 0) {
      return res.status(400).json({ message: "No linked bank accounts found" });
    }

    const activeAccountId = requestedAccountId || userAccounts[0];

    if (!userAccounts.includes(activeAccountId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this account" });
    }

    const response = await axios.get(
      `https://api.withmono.com/v2/accounts/${activeAccountId}/transactions`,
      {
        headers: {
          "mono-sec-key": process.env.MONO_SECRET_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    return res.status(200).json(response.data);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error getting transactions:", errorMessage);

    return res.status(500).json({
      message: "Error getting transactions",
      error: errorMessage,
    });
  }
};
