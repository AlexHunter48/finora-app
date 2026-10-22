import { API_BASE_URL } from "../config/api";

export async function getBankData({ token }) {
  const response = await fetch(`${API_BASE_URL}/bank/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Failed to fetch");
  return result;
}
