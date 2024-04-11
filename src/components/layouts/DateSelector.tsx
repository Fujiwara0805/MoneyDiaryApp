"use client";
import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";

const DateSelector = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <button className=" bg-red-500">先月</button>
        <DatePicker />
        <button className=" bg-blue-500">今月</button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateSelector;
