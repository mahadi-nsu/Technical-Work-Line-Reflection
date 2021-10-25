import React, { useEffect, useState } from "react";
import BookProduct from "../BookProduct/BookProduct";
import ReturnProduct from "../ReturnProduct/ReturnProduct";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../UI/Modal/Modal";
import styles from "./DataTable.module.css";

const pType = {
  BOOK_PRODUCT: "book_product",
  RETURN_PRODUCT: "return_product",
};
const initType = pType.BOOK_PRODUCT;

const DataTable = () => {
  const [datas, setDatas] = useState();
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(initType);

  useEffect(() => {
    const dataFRomStorage = localStorage.getItem("apiData");
    if (dataFRomStorage) {
      setDatas(JSON.parse(dataFRomStorage));
    }
  }, []);

  const handleInput = (e) => {
    setSearchText(e.target.value);
  };

  const bookHandler = () => {
    setModalType(pType.BOOK_PRODUCT);
    ModalHandler();
  };
  const returnHandler = () => {
    setModalType(pType.RETURN_PRODUCT);
    ModalHandler();
  };

  const ModalHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  const children =
    modalType === pType.BOOK_PRODUCT ? (
      <BookProduct data={datas} productModalHandler={ModalHandler} />
    ) : (
      <ReturnProduct data={datas} productModalHandler={ModalHandler} />
    );

  // if (!datas) <div>Loading....</div>;

  const renderHeader = () => {
    let headerElement = [
      "Name",
      "Code",
      "Availability",
      "Need To Repair",
      "durability",
      "Mileage",
    ];

    return headerElement.map((key, index) => {
      return <th className={styles.tableHead} key={index}>{key.toUpperCase()}</th>;
    });
  };

  const filtereddata =
    datas &&
    datas.filter(
      (data) =>
        data.name.toLowerCase().includes(searchText.toLowerCase()) ||
        data.code.toLowerCase().includes(searchText.toLowerCase())
    );

  const renderBody = () => {
    return (
      filtereddata &&
      filtereddata.map(
        ({
          code,
          name,
          durability,
          mileage,
          availability,
          needing_repair,
          max_durability,
        }) => {
          return (
            <tr key={code} style={{ width: "100%" }}>
              <td className={styles.tableData}>{name}</td>
              <td className={styles.tableData}>{code}</td>
              <td className={styles.tableData}>{availability ? "True" : "False"}</td>
              <td className={styles.tableData}>{needing_repair ? "True" : "False"}</td>
              <td className={styles.tableData}>
                {durability} / {max_durability}
              </td >
              <td className={styles.tableData}>{mileage}</td>
            </tr>
          );
        }
      )
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.tableCon}>
        <div className={styles.searchDiv}>
          <div className={styles.searchIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          <SearchBox handleInputData={handleInput} />
        </div>
        {renderHeader()}
        {!datas ? <div> Loading ... </div> : renderBody()}
      </div>
      <div className={styles.buttonDiv}>
        <button className={styles.button} onClick={() => bookHandler()}>
          {" "}
          Book{" "}
        </button>
        <button className={styles.button} onClick={() => returnHandler()}>
          {" "}
          Return{" "}
        </button>
      </div>

      <Modal show={showModal}>{children}</Modal>
    </div>
  );
};

export default DataTable;
