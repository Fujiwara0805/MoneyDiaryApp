import AppLayout from "@/components/layouts/AppLayout";
import React from "react";

interface ReportProps {
  swichView: (view: string) => void;
}
const Report = ({ swichView }: ReportProps) => {
  return (
    <main className=" bg-slate-300 min-h-screen">
      <AppLayout swichView={swichView} />
      <div className=" text-center justify-center mr-8">
        <h1>REPORT</h1>
      </div>
    </main>
  );
};

export default Report;
