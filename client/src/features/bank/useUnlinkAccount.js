import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unlinkAccount } from "../../services/bankApi";

export default function useUnlinkAccount() {
  const queryClient = useQueryClient();
  const {
    mutate: unLink,
    isPending,
    error,
  } = useMutation({
    mutationFn: unlinkAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-transactions"] });
    },
  });

  return { unLink, isPending, error };
}
