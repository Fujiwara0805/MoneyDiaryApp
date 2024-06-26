import { Dispatch, SetStateAction } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "@/components/layouts/calendar.css";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import { Balance, CalendarContent, Transaction } from "@/types/type";
import { calculateDailyBalance } from "@/utils/calculateBalance";
import { formatCurrency } from "@/utils/formatting";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { isSameMonth } from "date-fns";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: Dispatch<SetStateAction<Date>>;
  setCurrentDay: Dispatch<SetStateAction<string>>;
  currentDay: string;
  today: string;
}

export const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: CalendarProps) => {
  const dailyBalance = calculateDailyBalance(monthlyTransactions);

  //dailyBalance内のデータを整形
  const createCalendarEvent = (
    dailyBalance: Record<string, Balance>
  ): CalendarContent[] => {
    return Object.keys(dailyBalance).map((date) => {
      const { income, expense, balance } = dailyBalance[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };
  const currentEvents = createCalendarEvent(dailyBalance);
  const backGroundEvents = {
    start: currentDay,
    display: "background",
    backgroundColor: "#a7f3d0",
  };

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

  //どの月のデータでも取得できる様に修正
  const handleDateSet = (dateSet: DatesSetArg) => {
    const currentMonth = dateSet.view.currentStart;
    setCurrentMonth(currentMonth);
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
      setCurrentDay(today);
    }
  };
  //選択した日付の取引データを取得
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={jaLocale}
      events={[...currentEvents, backGroundEvents]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};
