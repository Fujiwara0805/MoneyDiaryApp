import { z } from "zod";
export const TransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です" }),
  amount: z.number().min(1, { message: "金額は１円以上必須です" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(50, { message: "内容は50文字以内で入力してください" }),
  category: z
    .union([
      z.enum([
        "食費",
        "日用品",
        "住居費",
        "交際費",
        "娯楽",
        "交通費",
        "給料",
        "副収入",
        "お小遣い",
      ]),
      z.literal(""),
    ])
    .refine((value) => value !== "", { message: "カテゴリを選択してください" }),
});
export type Schema = z.infer<typeof TransactionSchema>;
