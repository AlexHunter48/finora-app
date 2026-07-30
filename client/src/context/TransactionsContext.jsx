import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "./AuthContext";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();
  useEffect(() => {
    const accountId = user?.monoAccountId?.[0];
    if (!accountId || !token) return;

    async function getTransactions() {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/bank/transactions?monoAccountId=${accountId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/Login";
          return;
        }

        const data = await res.json();
        console.log(data?.data);

        setTransactions(data?.data || []);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    }

    getTransactions();
  }, [user?.monoAccountId, token]);

  const debits = transactions.filter((t) => t.type === "debit");
  const credits = transactions.filter((t) => t.type === "credit");

  const totalInflow = credits.reduce((sum, item) => sum + item.amount / 100, 0);
  const totalOutflow = debits.reduce((sum, item) => sum + item.amount / 100, 0);

  const weeklySpend = debits
    .filter((t) => {
      const txDate = new Date(t.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return txDate >= sevenDaysAgo;
    })
    .reduce((sum, t) => sum + t.amount / 100, 0);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthlySpend = debits
    .filter((t) => {
      const txDate = new Date(t.date);
      return (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount / 100, 0);
  const debitTransactions = debits.filter((t) => {
    const txDate = new Date(t.date);
    return (
      txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    );
  });
  const creditTransactions = credits.filter((t) => {
    const txDate = new Date(t.date);
    return (
      txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear
    );
  });

  const monthlyTransactions = transactions.filter((t) => {
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
        loading,
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
