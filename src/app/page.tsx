"use client";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/type";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/db/firebase";
import Home from "./home/page";
import Report from "./report/page";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
        console.log(transactionData);
      } catch (error) {
        console.log("データベース接続に失敗しました", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <main className=" bg-slate-300 min-h-screen">
      <Home />
      <Report />
    </main>
  );
}
