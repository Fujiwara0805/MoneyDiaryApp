import Box from "@mui/material/Box";
import AppLayout from "@/components/layouts/AppLayout";
import MonthlySummary from "@/components/layouts/MonthlySummary";
import Calendar from "@/components/layouts/Calendar";
import TransactionMenu from "@/components/layouts/TransactionMenu";
import TransactionForm from "@/components/layouts/TransactionForm";

export default function Home() {
  return (
    <main className=" bg-slate-300 min-h-screen">
      <AppLayout />
      <Box className="flex ">
        {/*左側コンテンツ*/}
        <Box className=" flex-grow ">
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
