import React, { useState, useEffect } from "react";
import DataTable from "./Components/DataTable/DataTable";
import data from "./data/data.json";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("apiData")) {
      localStorage.setItem("apiData", JSON.stringify(data));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  return <div>{loading ? <div></div> : <DataTable />}</div>;
}

export default App;
