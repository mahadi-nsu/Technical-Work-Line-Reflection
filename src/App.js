import React, { useState, useEffect } from "react";
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

  return <div className="App">{loading ? <div>Loading...</div> : null}</div>;
}

export default App;
