import AppLayout from "@/components/layouts/AppLayout";
import { Grid, Paper } from "@mui/material";
import React from "react";

interface ReportProps {
  switchView: (view: string) => void;
}

const Report = ({ switchView }: ReportProps) => {
  const commonPaperStyle = {
    height: { xs: "auto", md: "400px" },
  };
  return (
    <main className=" bg-slate-300 min-h-screen">
      <AppLayout switchView={switchView} />
      <div className=" mx-4 my-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            日付
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={commonPaperStyle}>カテゴリグラフ</Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={commonPaperStyle}>棒グラフ</Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            テーブル
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default Report;
