import { API_BASE_URL } from "../config/api";

export async function getSubscriptions(token) {
  const response = await fetch(`${API_BASE_URL}/subscription`, {
    method: "GET",
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
    throw new Error(result.message || "Failed to fetch subscriptions");
  }

  return result.subscriptions;
}

export async function createSubscription({ data, token }) {
  const response = await fetch(`${API_BASE_URL}/subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    throw new Error(result.message || "Failed to create subscription");
  }

  return result.subscription;
}

export async function deleteSubscription({ id, token }) {
  const response = await fetch(`${API_BASE_URL}/subscription/${id}`, {
    method: "DELETE",
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
    throw new Error(result.message || "Failed to delete subscription");
  }

  return result;
}

export async function runMockDetectionApi(token) {
  const response = await fetch(`${API_BASE_URL}/subscription/mock-detect`, {
    method: "POST",
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
    throw new Error(result.message || "Failed to run mock detection");
  }

  return result;
}
