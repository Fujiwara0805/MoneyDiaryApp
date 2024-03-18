import { format } from "date-fns";

export const formatMonth = (date: Date): string => {
  return format(date, "yyyy-MM-");
};
