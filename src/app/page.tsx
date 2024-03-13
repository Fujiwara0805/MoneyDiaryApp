import Box from "@mui/material/Box";
import AppLayout from "@/components/layouts/AppLayout";
import MonthlySummary from "@/components/layouts/MonthlySummary";
import Calendar from "@/components/layouts/Calendar";
import TransactionMenu from "@/components/layouts/TransactionMenu";
import TransactionForm from "@/components/layouts/TransactionForm";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/type";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/db/firebase";

export default function Home() {
  /* firebaseからデータ抽出 */
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    try {
      const querySnapshot = await getDocs(collection(db, "Transactions"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "→", doc.data());
      });
    } catch (error) {
      console.log("データベース接続に失敗しました", error);
    }
  }, []);

  return (
    <main className=" bg-slate-300 min-h-screen">
      <AppLayout />
      <Box className="flex ">
        {/*左側コンテンツ*/}
        <Box className=" flex-grow text-center ">
          <MonthlySummary />
          <Calendar />
        </Box>

        {/*右側コンテンツ*/}
        <Box>
          <TransactionMenu />
          <TransactionForm />
        </Box>
      </Box>
    </main>
  );
}
