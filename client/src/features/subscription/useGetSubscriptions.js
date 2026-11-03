import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getSubscriptions } from "../../services/subscriptionApi";

export default function useSubscriptions() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => getSubscriptions(token),
    enabled: !!token,
  });
}
