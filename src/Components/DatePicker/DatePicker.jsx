import { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "../../Components/Icons/CalendarIcon";
import { BotaoGlobal } from "../../Components/Buttons/ButtonGlobal";
import "./DatePicker.css";

export const CustomDatePicker = ({ onMonthChange, onDateRangeSelect, selectedMonth, selectedRange }) => {
    const [startDate, setStartDate] = useState(selectedRange?.startDate || null);
    const [endDate, setEndDate] = useState(selectedRange?.endDate || null);
    const [currentMonth, setCurrentMonth] = useState(selectedMonth || new Date());
    const datePickerRef = useRef(null);

    useEffect(() => {
        setStartDate(selectedRange?.startDate || null);
        setEndDate(selectedRange?.endDate || null);
        setCurrentMonth(selectedMonth || new Date());
    }, [selectedMonth, selectedRange]);

    const openDatePicker = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true);
        }
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end && onDateRangeSelect) {
            onDateRangeSelect({ startDate: start, endDate: end });
        }
    };

    const handleMonthChange = (date) => {
        setCurrentMonth(date);
        if (onMonthChange) {
            onMonthChange(date);
        }
    };

    const handleClickOutside = () => {
        datePickerRef.current?.setOpen(false);
    };

    return (
        <div className="datepicker-wrapper">
            <BotaoGlobal
                cor="nenhuma"
                icone={<CalendarIcon />}
                onClick={openDatePicker}
            />

            <DatePicker
                ref={datePickerRef}
                selected={startDate || currentMonth}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat="dd/MM/yyyy"
                popperPlacement="bottom-start"
                className="invisible-datepicker"
                calendarClassName="custom-calendar"
                dayClassName={() => "custom-day"}
                onClickOutside={handleClickOutside}
                onMonthChange={handleMonthChange}
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled
                }) => (
                    <div className="custom-header">
                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            ‹
                        </button>
                        <span>{date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</span>
                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            ›
                        </button>
                    </div>
                )}
            />
        </div>
    );
};