import { Balance, Transaction } from "@/types/type";

/*収支計算する関数*/
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

/*日付ごとの収支を計算する関数*/
export const calculateDailyBalance = (
  transactions: Transaction[]
): Record<string, Balance> => {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    /*未入力の場合 */
    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 };
    }

    if (transaction.type === "income") {
      acc[day].income += transaction.amount;
    } else if (transaction.type === "expense") {
      acc[day].expense += transaction.amount;
    }
    acc[day].balance = acc[day].income - acc[day].expense;
    return acc;
  }, {});
};
