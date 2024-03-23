import { format } from "date-fns";

export const formatMonth = (date: Date): string => {
  return format(date, "yyyy-MM-");
};

//日本円に変換する関数
