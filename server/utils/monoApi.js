import axios from "axios";

export const getMonoTransactions = async (monoAccountId) => {
  const response = await axios.get(
    `https://api.withmono.com/v2/accounts/${monoAccountId}/transactions`,
    {
      headers: {
        "mono-sec-key": process.env.MONO_SECRET_KEY,
        "Content-Type": "application/json",
      },
    },
  );
  return response.data?.data || [];
};
