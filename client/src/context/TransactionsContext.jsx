import { createContext, useContext } from "react";

import { useAuth } from "./AuthContext";
import useGetBankData from "../features/bank/useGetBankData";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const { user, token } = useAuth();
  const { bankData, isPending } = useGetBankData({ user, token });
  // useEffect(() => {
  //   const accountId = user?.monoAccountId?.[0];
  //   if (!accountId || !token) return;

  //   async function getTransactions() {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(
  //         `${API_BASE_URL}/bank/transactions?monoAccountId=${accountId}`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         },
  //       );

  //       if (res.status === 401) {
  //         localStorage.removeItem("token");
  //         window.location.href = "/Login";
  //         return;
  //       }

  //       const data = await res.json();
  //       console.log(data?.data);

  //       setTransactions(data?.data || []);
  //     } catch (err) {
  //       console.error("Failed to load transactions:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   getTransactions();
  // }, [user?.monoAccountId, token]);

  const transactions = bankData?.data;

  const debits = transactions?.filter((t) => t.type === "debit");
  const credits = transactions?.filter((t) => t.type === "credit");
  console.log("Credits", credits);

  const totalInflow = credits?.reduce(
    (sum, item) => sum + item.amount / 100,
    0,
  );
  const totalOutflow = debits?.reduce(
    (sum, item) => sum + item.amount / 100,
    0,
  );

  const weeklySpend = debits
    ?.filter((t) => {
      const txDate = new Date(t.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return txDate >= sevenDaysAgo;
    })
    ?.reduce((sum, t) => sum + t.amount / 100, 0);

  const latestTxDate =
    transactions?.length > 0 ? new Date(transactions[0].date) : new Date();
  const currentMonth = latestTxDate.getMonth();
  const currentYear = latestTxDate.getFullYear();
  const monthlySpend = debits
    ?.filter((t) => {
      const txDate = new Date(t.date);
      console.log("The date", txDate);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount / 100, 0);

  console.log("Monthly Spend", monthlySpend);
  const debitTransactions = debits?.filter((t) => {
    const txDate = new Date(t.date);
    return (
      txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    );
  });
  const creditTransactions = credits?.filter((t) => {
    const txDate = new Date(t.date);
    return (
      txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    );
  });

  const monthlyTransactions = transactions?.filter((t) => {
    const txDate = new Date(t.date);
    return (
      txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    );
  });

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        debits,
        debitTransactions,
        creditTransactions,
        credits,
        totalInflow,
        totalOutflow,
        weeklySpend,
        isPending,
        monthlySpend,
        monthlyTransactions,
        currentMonth,

        currentYear,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);
