import { useQuery } from "@tanstack/react-query";
import { getBankData } from "../../services/bankApi";

export default function useGetBankData({ user, token, monoAccountId }) {
  const {
    data: bankData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bank-transactions", user?.monoAccountId, monoAccountId],
    queryFn: () => getBankData({ token, monoAccountId }),
    enabled: Boolean(user?.monoAccountId && user.monoAccountId.length > 0),
  });

  return { bankData, isPending, error };
}
