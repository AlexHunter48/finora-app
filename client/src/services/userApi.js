import { API_BASE_URL } from "../config/api";

export async function getCurrentUser({ token }) {
  const response = await fetch(`${API_BASE_URL}/profile/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
