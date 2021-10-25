import React, { useState, useEffect } from "react";
import Select from "react-select";

import DatePicker from "../UI/DatePicker/DatePicker";
import styles from "./ReturnProduct.module.css";
import Modal from "../UI/Modal/Modal";
import Result from "../Result/Result";

const ReturnProduct = ({ data, productModalHandler }) => {
    // date state
    const yesterday = new Date((new Date()).valueOf() + 1000 * 60 * 60 * 24);
    const today = new Date();
    const [days, setDays] = useState(1);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(yesterday);

    // dropdown state
    const [selectedValue, setSelectedValue] = useState();
    const [options, setOptions] = useState([]);
    const [repairOptions, setRepairOptions] = useState([{ value: true, label: 'Yes' }, { value: false, label: 'No' }]);
    const [repairSelectedValue, setRepairSelectedValue] = useState();

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
        if (selectedValue) {
            data.forEach(element => {

                if (element.code === selectedValue.value) {
                    setResult(element);
                }
            });
        }
    }, [selectedValue, days]);

    const updateStorage = () => {
        if (data) {
            let updatedData = data;
            for (let index = 0; index < updatedData.length; index++) {
                if (updatedData[index].code === selectedValue.value) {
                    updatedData[index].needing_repair = repairSelectedValue.value;
                    if (updatedData[index].type === 'plain') {
                        updatedData[index].durability = updatedData[index].durability - days * 1;
                    } else {
                        updatedData[index].durability = updatedData[index].durability - days * 2;
                    }
                    break;
                }
            };
            localStorage.setItem("apiData", JSON.stringify(updatedData));
        }
    }

    return (
        <div className={styles.BookProduct}>
            <h3 >Return a product</h3>
            <div className={styles.Dropdown}>
                <Select
                    options={options}
                    value={selectedValue}
                    onChange={(value) => {
                        setSelectedValue(value);
                    }}
                />
            </div>
            <div className={styles.Dropdown}>
                <Select
                    options={repairOptions}
                    value={repairSelectedValue}
                    onChange={(value) => {
                        setRepairSelectedValue(value);
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
                    result={{ ...result, days }}
                    days={days}
                    resultModalhander={modalHandler}
                    productModalHandler={productModalHandler}
                    updateStorage={updateStorage} />
            </Modal>
        </div>
    )
}

export default ReturnProduct;
