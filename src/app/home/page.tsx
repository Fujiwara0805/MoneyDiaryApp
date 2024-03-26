import Box from "@mui/material/Box";
import AppLayout from "@/components/layouts/AppLayout";
import MonthlySummary from "@/components/layouts/MonthlySummary";
import { Calendar } from "@/components/layouts/Calendar";
import TransactionMenu from "@/components/layouts/TransactionMenu";
// import TransactionForm from "@/components/layouts/TransactionForm";
import { Transaction } from "@/types/type";
import { Dispatch, SetStateAction, useState } from "react";
import { format } from "date-fns";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);

  /*選択した日付の取引履歴を取得*/
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

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
          />
        </Box>

        {/*右側コンテンツ*/}
        <Box>
          <TransactionMenu
            dailyTransactions={dailyTransactions}
            currentDay={currentDay}
          />
          {/* <TransactionForm /> */}
        </Box>
      </Box>
    </main>
  );
};

export default Home;
