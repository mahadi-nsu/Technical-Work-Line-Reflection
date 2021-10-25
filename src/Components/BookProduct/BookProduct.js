import React, { useState, useEffect } from "react";
import Select from "react-select";

import DatePicker from "../UI/DatePicker/DatePicker";
import styles from "./BookProduct.module.css";
import Modal from "../UI/Modal/Modal";
import Result from "../Result/Result";

const BookProduct = ({ data, productModalHandler }) => {

    // date state
    const yesterday = new Date((new Date()).valueOf() + 1000 * 60 * 60 * 24);
    const today = new Date();
    const [days, setDays] = useState(1);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(yesterday);

    // dropdown state
    const [selectedValue, setSelectedValue] = useState();
    const [options, setOptions] = useState([]);

    // result modal state
    const [showModal, setShowModal] = useState(false);
    const modalHandler = (value) => {
        setShowModal(value);
    }
    const [result, setResult] = useState(0);

    // ------------------
    // calculate days from start and end date picker
    useEffect(() => {
        if (startDate && endDate) {
            const startDateTime = startDate.getTime();
            const endDateTime = endDate.getTime();
            const day = Math.abs(Math.floor((startDateTime - endDateTime) / (1000 * 3600 * 24)));
            setDays(day);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        if (data) {
            const tempArray = [];
            data.forEach(element => {
                tempArray.push({ value: element.code, label: element.name });
            });

            setOptions([...tempArray]);
        }
    }, [data]);

    useEffect(() => {
        console.log("inside result hooks");
        if (selectedValue) {
            data.forEach(element => {

                if (element.code === selectedValue.value) {
                    setResult(element);
                }
            });
        }
    }, [selectedValue, days]);

    return (
        <div className={styles.BookProduct}>
            <h3 >Book a product</h3>
            <div className={styles.Dropdown}>
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={(value) => {
                        setSelectedValue(value);
                    }}
                />
            </div>
            <DatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            <div className={styles.Confirmation}>
                <button onClick={() => productModalHandler()}> No</button>
                <button onClick={() => modalHandler(true)}>Yes</button>
            </div>

            <Modal show={showModal}>
                <Result
                    isBook
                    result={{ ...result, days }}
                    days={days}
                    resultModalhander={modalHandler}
                    productModalHandler={productModalHandler} />
            </Modal>
        </div>
    )
}

export default BookProduct;
