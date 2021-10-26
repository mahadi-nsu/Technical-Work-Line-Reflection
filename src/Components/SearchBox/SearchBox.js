import React from "react";
import styles from "./SearchBox.module.css";

const SearchBox = ({ handleInputData }) => {
  return (
    <form className={styles.searchBox}>
      <input
        placeholder="Enter Name/Code to Search"
        type="text"
        className={styles.searchInput}
        onChange={handleInputData}
      />
    </form>
  );
};

export default SearchBox;
