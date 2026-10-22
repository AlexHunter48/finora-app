import { useQuery } from "@tanstack/react-query";
import { getBankData } from "../../services/bankApi";

export default function useGetBankData({ user, token }) {
  const {
    data: bankData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bank-transactions", user?.monoAccountId],
    queryFn: () => getBankData({ token }),
    enabled: Boolean(user?.monoAccountId && user.monoAccountId.length > 0),
  });

  return { bankData, isPending, error };
}
