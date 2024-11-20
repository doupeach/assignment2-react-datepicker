import { useState } from "react";
import dayjs from "dayjs";
import "./DatePicker.css";

const DatePicker = ({ task }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const daysInMonth = currentMonth.daysInMonth(); // 當月的天數
  const firstDayOfMonth = currentMonth.startOf("month").day(); // 當月第一天是星期幾
  const daysInLastMonth = currentMonth.subtract(1, "month").daysInMonth(); // 上個月的天數
  const remainingDays = (7 - ((daysInMonth + firstDayOfMonth) % 7)) % 7; // 計算需要補齊的下個月天數
  const isCrossMonthClick = task === "cross month";

  const handleDayClick = (date) => {
    if (!startDate && !endDate) {
      setStartDate(date);
      setEndDate(null);
    }
    if (date.isSame(startDate, "day") || date.isAfter(startDate, "day")) {
      setEndDate(date);
    }
    if (
      startDate &&
      endDate &&
      (date.isSame(startDate, "day") || date.isBefore(startDate, "day"))
    ) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleCrossMonthClick = (date) => {
    if (!isCrossMonthClick) {
      return;
    }
    handleDayClick(date);
  };

  const renderDays = () => {
    const days = [];

    // 補足上個月的空白天數
    for (let i = 0; i < firstDayOfMonth; i++) {
      const date = currentMonth
        .subtract(1, "month")
        .date(daysInLastMonth - (firstDayOfMonth - 1) + i);

      const isActive =
        (date.isAfter(startDate, "day") && date.isBefore(endDate, "day")) ||
        date.isSame(startDate, "day") ||
        date.isSame(endDate, "day");

      days.push(
        <button
          key={`empty-last-${i}`}
          className={`day-button ${!isCrossMonthClick ? "empty-slot" : ""} ${
            isActive ? "active" : ""
          }`}
          disabled={!isCrossMonthClick}
          onClick={() => handleCrossMonthClick(date)}
        >
          {date.date()}日
        </button>
      );
    }

    // 當月日期
    for (let i = 1; i <= daysInMonth; i++) {
      const date = currentMonth.date(i);
      const isToday = date.isSame(dayjs(), "day");
      const isActive =
        (date.isAfter(startDate, "day") && date.isBefore(endDate, "day")) ||
        date.isSame(startDate, "day") ||
        date.isSame(endDate, "day");

      days.push(
        <button
          key={i}
          className={`day-button ${isToday ? "today" : ""} ${
            isActive ? "active" : ""
          }`}
          onClick={() => handleDayClick(date)}
        >
          {i}日
        </button>
      );
    }

    // 補足下個月的空白天數
    for (let i = 1; i <= remainingDays; i++) {
      const date = currentMonth.add(1, "month").date(i);
      const isActive =
        (date.isAfter(startDate, "day") && date.isBefore(endDate, "day")) ||
        date.isSame(startDate, "day") ||
        date.isSame(endDate, "day");
      days.push(
        <button
          key={`empty-next-${i}`}
          className={`day-button ${!isCrossMonthClick ? "empty-slot" : ""} ${
            isActive ? "active" : ""
          }`}
          disabled={!isCrossMonthClick}
          onClick={() => handleCrossMonthClick(date)}
        >
          {date.date()}日
        </button>
      );
    }

    return days;
  };

  return (
    <div className="date-picker">
      <header className="header">
        <button
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          className="month-select"
          disabled={!isCrossMonthClick}
        >
          &lt;
        </button>
        <span>{currentMonth.format("YYYY年M月")}</span>
        <button
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          className="month-select"
          disabled={!isCrossMonthClick}
        >
          &gt;
        </button>
      </header>
      <div className="days-grid">{renderDays()}</div>
    </div>
  );
};

export default DatePicker;
