"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventItem } from "@/types/acf";

interface CalendarWidgetProps {
    events: EventItem[];
    onDateSelect: (date: Date | null) => void;
    selectedDate: Date | null;
}

const CalendarWidget = ({ events, onDateSelect, selectedDate }: CalendarWidgetProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const days = useMemo(() => {
        const totalDays = daysInMonth(currentYear, currentMonth);
        const startDay = firstDayOfMonth(currentYear, currentMonth);
        const daysArray: (number | null)[] = Array(startDay).fill(null);

        for (let i = 1; i <= totalDays; i++) {
            daysArray.push(i);
        }
        return daysArray;
    }, [currentMonth, currentYear]);

    // Check if a day has an event
    const hasEvent = (day: number) => {
        return events.some(event => {
            const eventDate = new Date(event.acf.event_date_and_time);
            return (
                eventDate.getDate() === day &&
                eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear
            );
        });
    };

    const isSelected = (day: number) => {
        return (
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentMonth &&
            selectedDate?.getFullYear() === currentYear
        );
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            today.getDate() === day &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear
        );
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handleDayClick = (day: number | null) => {
        if (!day) return;
        const newDate = new Date(currentYear, currentMonth, day);
        onDateSelect(newDate);
    };

    return (
        <div
            className="rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg"
            style={{
                background: "linear-gradient(145deg, #E2E8EC, #FFFFFF)",
                boxShadow: "5px 5px 15px #D1D9E6, -5px -5px 15px #FFFFFF",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-slate-500" />
                </button>
                <div className="flex items-center gap-2 font-semibold text-[#05668D]">
                    <span>{monthNames[currentMonth].substring(0, 3)}</span>
                    <span className="text-slate-400">{currentYear}</span>
                </div>
                <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <ChevronRight className="w-5 h-5 text-slate-500" />
                </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-2 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="text-xs font-medium text-blue-300">
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-2 place-items-center">
                {days.map((day, index) => (
                    <div key={index} className="w-8 h-8 flex items-center justify-center">
                        {day ? (
                            <button
                                onClick={() => handleDayClick(day)}
                                className={cn(
                                    "w-8 h-8 text-xs rounded-lg flex items-center justify-center transition-all",
                                    isSelected(day)
                                        ? "bg-[#05668D] text-white shadow-md font-bold"
                                        : hasEvent(day)
                                            ? "bg-blue-100 text-[#05668D] font-bold border border-blue-200"
                                            : "text-slate-600 hover:bg-slate-200",
                                    !isSelected(day) && isToday(day) && "ring-1 ring-[#05668D] text-[#05668D]"
                                )}
                            >
                                {day}
                            </button>
                        ) : (
                            <span></span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarWidget;
