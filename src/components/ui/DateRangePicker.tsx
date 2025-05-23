import React from "react";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import calendar from '@/public/icons/calendar.svg'
import Image from "next/image";
import arrow from '@/public/icons/arrow.svg';

type Props = {
  onSelectRange: (range: { startDate: Date; endDate: Date }) => void;
};

export default function DateRangePicker({ onSelectRange }: Props) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      onSelectRange({ startDate, endDate: date });
    }
  };

  const getFormattedDate = () => {
    if (startDate && endDate) {
      return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`;
    }
    if (startDate) return `${format(startDate, "MMM d")}`;
    return "";
  };

  const renderDays = () => {
    const days: React.ReactNode[] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekDay = firstDay.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startWeekDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const thisDate = new Date(year, month, d);
      const isInRange =
        startDate &&
        endDate &&
        thisDate >= new Date(startDate.setHours(0, 0, 0, 0)) &&
        thisDate <= new Date(endDate.setHours(0, 0, 0, 0));

      const isSelected =
        startDate?.toDateString() === thisDate.toDateString() ||
        endDate?.toDateString() === thisDate.toDateString();

      days.push(
        <button
          key={d}
          onClick={() => handleDateClick(new Date(year, month, d))}
          className={`w-10 h-10 flex items-center justify-center text-sm text-black/70 rounded-xl
            ${
              isSelected
                ? "bg-[#F5F3ED] text-black border border-black"
                : isInRange
                ? "bg-[#F5F3ED] text-black "
                : "hover:bg-[#F5F3ED] text-black"
            }`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  return (
    <div className="relative group w-full my-0 max-w-96 2xl:max-w-[30rem] shadow-lg rounded-xl" ref={pickerRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1 px-4 py-4 2xl:py-5 border border-transparent rounded-xl outline-none bg-[#fffefc] text-black/70 transition duration-150 ease-in-out focus:border-black/20 focus:-translate-y-0.5 2xl:placeholder:text-xl 2xl:text-xl"
      >
        <Image
          src={calendar}
          alt="Calendar"
          width={26}
          height={26}
          className={`absolute left-2 transition-all duration-300 ease-in-out w-8 h-8 2xl:w-9 2xl:h-9
            ${getFormattedDate() ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100'}`}
        />
        <span className="text-black/50 flex-1 text-left pl-7 2xl:pl-9">
          {getFormattedDate() || "Pick a period"}
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 p-4 rounded-xl border bg-[#fffefc] shadow-lg w-[280px]">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handlePrevMonth}
              className="text-xs font-semibold text-black hover:bg-[#F5F3ED] p-2 rounded-xl"
            >
              <Image
                src={arrow}
                alt="arrow"
                width={22}
                height={22}
                className={`rotate-90`}
              />
            </button>
            <span className="text-xs font-semibold text-black">
              {format(currentMonth, "MMM yyyy")}
            </span>
            <button
              onClick={handleNextMonth}
              className="text-xs font-semibold text-black hover:bg-[#F5F3ED] p-2 rounded-xl"
            >
              <Image
                src={arrow}
                alt="arrow"
                width={22}
                height={22}
                className={`-rotate-90`}
              />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs text-black mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center font-semibold ">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
        </div>
      )}
    </div>
  );
}
