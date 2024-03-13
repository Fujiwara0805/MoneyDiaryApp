export type TRANSACTION_TYPE = "income" | "expense";
export type INCOME_CATEGORY = "給与" | "副収入" | "お小遣い";
export type EXPENSE_CATEGORY =
  | "食費"
  | "日用品"
  | "住居費"
  | "交際費"
  | "娯楽"
  | "交通費";

export interface Transaction {
  id: string;
  amount: number;
  type: TRANSACTION_TYPE;
  date: string;
  category: INCOME_CATEGORY | EXPENSE_CATEGORY;
  content: string;
}
