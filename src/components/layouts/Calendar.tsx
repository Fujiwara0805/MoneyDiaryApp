import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "@/components/layouts/calendar.css";
import { EventContentArg } from "@fullcalendar/core";
import { Balance, CalendarContent, Transaction } from "@/types/type";
import { calculateDailyBalance } from "@/utils/calculateBalance";

interface CalendarProps {
  monthlyTransactions: Transaction[];
}

export const Calendar = ({ monthlyTransactions }: CalendarProps) => {
  const dailyBalance = calculateDailyBalance(monthlyTransactions);
  // console.log(dailyBalance);

  //イベント情報配列
  const events = [
    {
      title: "Meeting",
      date: "2024-03-21",
      income: 300,
      expense: 200,
      balance: 100,
    },
  ];

  //dailyBalance内のデータを整形
  const createCalendarEvent = (
    dailyBalance: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalance).map((date) => {
      const { income, expense, balance } = dailyBalance[date];
      return {
        start: date,
        income: income,
        expense: expense,
        balance: balance,
      };
    });
  };
  // console.log(createCalendarEvent(dailyBalance));

  //カレンダーへ収支を反映(jsx)
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <>
        <div>
          <div className=" font-medium text-gray-500">
            {eventInfo.event.title}
          </div>
          <div className="money" id="event-income">
            {eventInfo.event.extendedProps.income}
          </div>
          <div className="money" id="event-expense">
            {eventInfo.event.extendedProps.expense}
          </div>
          <div className="money" id="event-balance">
            {eventInfo.event.extendedProps.balance}
          </div>
        </div>
      </>
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale={jaLocale}
      events={events}
      eventContent={renderEventContent}
    />
  );
};
