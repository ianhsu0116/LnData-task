import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { SearchGroup } from "./components/SearchGroup";
import { TableGroup } from "./components/TableGroup";

function App() {
  return (
    <Router>
      <Navbar />
      <SearchGroup />
      <Routes>
        <Route path="/" exact element={<TableGroup />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
