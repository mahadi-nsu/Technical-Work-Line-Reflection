import React, { useState, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './DatePicker.module.css';

const DatePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {

    // const [startDate, setStartDate] = useState(new Date("2021/02/08"));
    // const [endDate, setEndDate] = useState(new Date("2021/02/14"));

    const DatePickerFrom = forwardRef(({ value, onClick }, ref) => (
        <div className={styles.FromCalendar} onClick={onClick} ref={ref}>
            <h4>From</h4>
            <p> {value}</p>
            <img
                src="https://img.icons8.com/ios/50/000000/calendar--v1.png"
                alt="calendar_images"
                height="20px"
                width="20px" />
        </div>
    ));
    const DatePickerTo = forwardRef(({ value, onClick }, ref) => (
        <div className={styles.ToCalendar} onClick={onClick} ref={ref}>
            <h4>To</h4>
            <p> {value}</p>
            <img
                src="https://img.icons8.com/ios/50/000000/calendar--v1.png"
                alt="calendar_images"
            />
        </div>
    ));

    return (
        <div className={styles.DatePicker}>
            <ReactDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                customInput={<DatePickerFrom />}
            />
            <ReactDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                customInput={<DatePickerTo />}
            />
        </div>
    )
}

export default DatePicker;

