import axios from "axios";

export const transactions = async (req, res) => {
  try {
    const { monoAccountId } = req.query;

    if (!monoAccountId) {
      return res.status(400).json({ message: "monoAccountId is required" });
    }
    const response = await axios.get(
      `https://api.withmono.com/v2/accounts/${monoAccountId}/transactions`,
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
