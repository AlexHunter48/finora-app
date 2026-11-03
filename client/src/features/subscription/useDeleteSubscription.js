import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubscription } from "../../services/subscriptionApi";
import { useAuth } from "../../context/AuthContext";

export function useDeleteSubscription() {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: (id) => deleteSubscription({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
}
