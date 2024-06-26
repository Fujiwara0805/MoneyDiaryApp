"use client";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme/theme";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/type";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/db/firebase";
import Home from "./home/page";
import Report from "./report/page";
import { formatMonth } from "@/utils/formatting";
import { Schema } from "@/validation/schema";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [currentView, setCurrentView] = useState("home");

  /* firebaseから全データ抽出 */
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
        console.error(error);
      }
    };
    fetchTransactions();
  }, [transactions]);

  /* 取引データをfirebaseへ保存 */
  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      /* firebaseへデータ追加 */
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    } catch (error) {
      console.error("データの保存に失敗しました");
    }
  };

  /* 選択した取引データの削除 */
  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteDoc(doc(db, "Transactions", transactionId));
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => {
          transaction.id !== transactionId;
        })
      );
    } catch (error) {
      console.log("データ削除に失敗しました");
    }
  };

  /* 選択した取引データの更新 */
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);
      const updateTransaction = transactions.map((prevTransaction) =>
        prevTransaction.id === transactionId
          ? { ...prevTransaction, ...transaction }
          : prevTransaction
      ) as Transaction[];
      setTransactions(updateTransaction);
    } catch (error) {
      console.log(error);
    }
  };

  /* 画面の変更処理 */
  const switchView = (view: string) => {
    setCurrentView(view);
  };

  /* 各月のデータを抽出 */
  const MonthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  return (
    <ThemeProvider theme={theme}>
      <main className=" bg-slate-300 min-h-screen">
        {currentView === "home" ? (
          <Home
            monthlyTransactions={MonthlyTransactions}
            setCurrentMonth={setCurrentMonth}
            onSaveTransaction={handleSaveTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            onUpdateTransaction={handleUpdateTransaction}
            selectedTransaction={selectedTransaction}
            setSelectedTransaction={setSelectedTransaction}
            switchView={switchView}
          />
        ) : (
          <Report
            switchView={switchView}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        )}
      </main>
    </ThemeProvider>
  );
}
