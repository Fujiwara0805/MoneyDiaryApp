import AppLayout from "@/components/layouts/AppLayout";
import BarChat from "@/components/layouts/BarChat";
import CategoryChat from "@/components/layouts/CategoryChat";
import DateSelector from "@/components/layouts/DateSelector";
import TransactionTable from "@/components/layouts/TransactionTable";
import { Grid, Paper } from "@mui/material";
import React from "react";

interface ReportProps {
  switchView: (view: string) => void;
}

const Report = ({ switchView }: ReportProps) => {
  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" },
    display: "flex",
    flexDirection: "column",
  };
  return (
    <main className=" bg-slate-300 min-h-screen">
      <AppLayout switchView={switchView} />
      <div className=" mx-4 my-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DateSelector />
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={commonPaperStyle}>
              <CategoryChat />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={commonPaperStyle}>
              <BarChat />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            <TransactionTable />
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default Report;
