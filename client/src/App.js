import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { TableGroup } from "./components/TableGroup";
import { PlayerDetail } from "./components/PlayerDetail";

function App() {
  // 所有資料總共需要幾頁
  const [totalPages, setTotalPages] = useState(10);

  // 當前拿到的所有資料
  const [currentData, setCurrentData] = useState([]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <TableGroup
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              currentData={currentData}
              setCurrentData={setCurrentData}
            />
          }
        ></Route>
        <Route path="/players/:id" exact element={<PlayerDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
