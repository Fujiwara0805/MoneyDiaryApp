"use client";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/type";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/db/firebase";
import Home from "./home/page";
import Report from "./report/page";
import { formatMonth } from "@/utils/formatting";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  /* firebaseからデータ抽出 */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionData = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as Transaction;
        });
        setTransactions(transactionData);
      } catch (error) {
        console.error("データベース接続に失敗しました");
      }
    };
    fetchTransactions();
  }, []);

  /* 各月のデータを抽出 */
  const MonthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  return (
    <main className=" bg-slate-300 min-h-screen">
      <Home monthlyTransactions={MonthlyTransactions} />
      <Report />
    </main>
  );
}
