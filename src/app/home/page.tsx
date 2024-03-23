import Box from "@mui/material/Box";
import AppLayout from "@/components/layouts/AppLayout";
import MonthlySummary from "@/components/layouts/MonthlySummary";
import { Calendar } from "@/components/layouts/Calendar";
import TransactionMenu from "@/components/layouts/TransactionMenu";
import TransactionForm from "@/components/layouts/TransactionForm";
import { Transaction } from "@/types/type";

interface HomeProps {
  monthlyTransactions: Transaction[];
}

const Home = ({ monthlyTransactions }: HomeProps) => {
  return (
    <main className=" bg-slate-300 min-h-screen">
      <AppLayout />
      <Box className="flex ">
        {/*左側コンテンツ*/}
        <Box className=" flex-grow text-center mx-8 my-8">
          <MonthlySummary monthlyTransactions={monthlyTransactions} />
          <Calendar monthlyTransactions={monthlyTransactions} />
        </Box>

        {/*右側コンテンツ*/}
        {/* <Box>
          <TransactionMenu />
          <TransactionForm />
        </Box> */}
      </Box>
    </main>
  );
};

export default Home;
