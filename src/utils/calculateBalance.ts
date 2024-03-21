import { Balance, Transaction } from "@/types/type";

export const calculateBalance = (transactions: Transaction[]): Balance => {
  const result = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else if (transaction.type === "expense") {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0, balance: 0 }
  );
  result.balance = result.income - result.expense;
  return result;
};
