import { API_BASE_URL } from "../config/api";
export async function getBankData({ token, monoAccountId }) {
  const url = monoAccountId
    ? `${API_BASE_URL}/bank/transactions?monoAccountId=${monoAccountId}`
    : `${API_BASE_URL}/bank/transactions`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    throw new Error(result.message || "Failed to fetch");
  }
  return result;
}

export async function unlinkAccount({ accountId, token }) {
  const response = await fetch(`${API_BASE_URL}/bank/unlink`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ accountId }),
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    throw new Error(data.message || "Error unlinking account");
  }

  return data;
}
