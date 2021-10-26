import React, { useState, useEffect } from "react";
import styles from "./Result.module.css";

const Result = ({
  isBook,
  result,
  resultModalhander,
  productModalHandler,
  updateStorage,
}) => {
  return (
    <div>
      <h3>{isBook ? "Book" : "Return"} a product</h3>
      {/* return result */}

      {/* book result */}
      {result.days >= result.minimum_rent_period ? (
        <h3>Your estimate price is :{result.price * result.days} </h3>
      ) : (
        <div>
          Minimum rent period is : {result.minimum_rent_period}.{<br />} You
          should select days more than minimum rent period
        </div>
      )}

      <div className={styles.Confirmation}>
        <button onClick={() => resultModalhander(false)}>No</button>
        <button
          onClick={() => {
            resultModalhander(false);
            productModalHandler();
            updateStorage();
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Result;
