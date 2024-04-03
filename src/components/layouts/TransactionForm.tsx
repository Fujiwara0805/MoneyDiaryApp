import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SavingsIcon from "@mui/icons-material/Savings";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EXPENSE_CATEGORY, INCOME_CATEGORY } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, TransactionSchema } from "@/validation/schema";

/* 型定義 */
interface TransactionFormProps {
  onClickDrawerToggle: () => void;
  isTransactionInput: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
}
type trackIncome = "income" | "expense";
type CategoryItem = {
  label: INCOME_CATEGORY | EXPENSE_CATEGORY;
  icon: JSX.Element;
};

const TransactionForm = ({
  onClickDrawerToggle,
  isTransactionInput,
  currentDay,
  onSaveTransaction,
}: TransactionFormProps) => {
  const formWidth = 320;
  /* 支出用アイテム */
  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
    { label: "住居費", icon: <AddHomeIcon fontSize="small" /> },
    { label: "交際費", icon: <DeliveryDiningIcon fontSize="small" /> },
    { label: "娯楽", icon: <SportsTennisIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
  ];
  /* 収入用アイテム */
  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" /> },
    { label: "副収入", icon: <AddBusinessIcon fontSize="small" /> },
    { label: "お小遣い", icon: <SavingsIcon fontSize="small" /> },
  ];
  const [categories, setCategories] = useState(expenseCategories);
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    resolver: zodResolver(TransactionSchema),
  });
  const currentType = watch("type");

  /* 選択された日付に変更する処理 */
  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  /* カテゴリの変更処理 */
  useEffect(() => {
    const newCategories =
      currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType]);

  /* 支出・収入ボタンの切替 */
  const typeToggle = (type: trackIncome) => {
    setValue("type", type);
    setValue("category", "");
    setValue("amount", 0);
    setValue("content", "");
  };

  /* 送信処理 */
  const onSubmit: SubmitHandler<Schema> = (data) => {
    onSaveTransaction(data);
    reset({
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: !isTransactionInput ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={onClickDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <div className="flex w-full grid-cols-4 gap-4">
                <button
                  type="button"
                  className={`flex-1 ${
                    field.value === "expense"
                      ? "bg-red-500 text-white"
                      : "bg-white text-red-500 border border-red-500"
                  } focus:bg-red-700 focus:text-white px-4 py-2 text-lg rounded-lg`}
                  onClick={() => {
                    typeToggle("expense");
                  }}
                >
                  支出
                </button>
                <button
                  type="button"
                  className={`flex-1 ${
                    field.value === "income"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 border border-blue-500"
                  } focus:bg-blue-700 focus:text-white px-4 py-2 text-lg rounded-lg`}
                  onClick={() => {
                    typeToggle("income");
                  }}
                >
                  収入
                </button>
              </div>
            )}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                error={!!errors.category}
                helperText={errors.category?.message}
                select
              >
                {categories.map((category, index) => (
                  <MenuItem value={category.label} key={index}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="内容"
                type="text"
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
          {/* 保存ボタン */}
          <button
            type="submit"
            className={`${
              currentType === "income"
                ? "bg-blue-500 text-white"
                : "bg-red-500 text-white"
            } w-full focus:bg-${
              currentType === "income" ? "blue-700" : "red-700"
            } focus:text-white px-4 py-2 text-lg rounded-lg`}
          >
            保存
          </button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
