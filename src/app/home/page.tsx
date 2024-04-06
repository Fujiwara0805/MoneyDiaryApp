import Box from "@mui/material/Box";
import AppLayout from "@/components/layouts/AppLayout";
import MonthlySummary from "@/components/layouts/MonthlySummary";
import { Calendar } from "@/components/layouts/Calendar";
import TransactionMenu from "@/components/layouts/TransactionMenu";
import TransactionForm from "@/components/layouts/TransactionForm";
import { Transaction } from "@/types/type";
import { Dispatch, SetStateAction, useState } from "react";
import { format } from "date-fns";
import { Schema } from "@/validation/schema";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: Dispatch<SetStateAction<Transaction | null>>;
}

const Home = ({
  monthlyTransactions,
  setCurrentMonth,
  onSaveTransaction,
  selectedTransaction,
  setSelectedTransaction,
}: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isTransactionInput, setIsTransactionInput] = useState(true);

  /*選択した日付の取引履歴を取得*/
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });
  /*取引入力欄の開閉処理(内訳ボタン押下時)*/
  const onClickDrawerToggle = () => {
    if (selectedTransaction === null) {
      setIsTransactionInput(!isTransactionInput);
    }
    setSelectedTransaction(null);
  };
  /*取引情報の選択*/
  const onSelectTransaction = (transaction: Transaction) => {
    setIsTransactionInput(false);
    setSelectedTransaction(transaction);
    console.log(transaction);
  };

  return (
    <main className=" bg-slate-300 min-h-screen">
      <AppLayout />
      <Box className="flex ">
        {/*左側コンテンツ*/}
        <Box className=" flex-grow text-center mx-8 my-8">
          <MonthlySummary monthlyTransactions={monthlyTransactions} />
          <Calendar
            monthlyTransactions={monthlyTransactions}
            setCurrentMonth={setCurrentMonth}
            setCurrentDay={setCurrentDay}
            currentDay={currentDay}
            today={today}
          />
        </Box>

        {/*右側コンテンツ*/}
        <Box>
          <TransactionMenu
            dailyTransactions={dailyTransactions}
            currentDay={currentDay}
            onClickDrawerToggle={onClickDrawerToggle}
            onSelectTransaction={onSelectTransaction}
          />
          <TransactionForm
            onClickDrawerToggle={onClickDrawerToggle}
            isTransactionInput={isTransactionInput}
            currentDay={currentDay}
            onSaveTransaction={onSaveTransaction}
            selectedTransaction={selectedTransaction}
          />
        </Box>
      </Box>
    </main>
  );
};

export default Home;
