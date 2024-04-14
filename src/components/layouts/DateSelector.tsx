"use client";
import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";
import React from "react";

interface DateSelectorProps {
  currentMonth: Date;
  setCurrentMonth:
}

const DateSelector = ({ currentMonth, setCurrentMonth }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <button className="bg-red-500 focus:bg-red-700 text-white px-4 py-2 text-lg rounded-lg mx-4">
          先月
        </button>
        <DatePicker
          label={"年月を変更"}
          views={["year", "month"]}
          sx={{ mx: 2, background: "white" }}
          format="yyyy年MM月"
          slotProps={{ toolbar: { toolbarFormat: "yyyy年MM月" } }}
        />
        <button className=" bg-blue-500 focus:bg-blue-700 focus:text-white px-4 py-2 text-lg rounded-lg mx-4">
          今月
        </button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateSelector;
