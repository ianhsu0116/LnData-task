import React, { useState, useEffect } from "react";

export const SearchGroup = (props) => {
  const [searchValue, setSearchValue] = useState({
    team: "",
    keywords: "",
  });

  // 即時抓取input更新
  const handleValueChange = (e) => {
    setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
  };

  // 送出搜尋
  const handleSearch = () => {
    console.log(searchValue);
  };

  return (
    <div className="SearchGroup">
      <div className="SearchGroup-con">
        <div className="SearchGroup-con-top">
          <label htmlFor="team">Team: </label>
          <select name="team" id="team" onChange={handleValueChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          <label htmlFor="keywords">Keywords: </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            onChange={handleValueChange}
          />
        </div>
        <div className="SearchGroup-con-bottom">
          <button className="SearchGroup-con-bottom-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="SearchGroupShowCharts">
        <button className="SearchGroupShowCharts-btn">Show Charts</button>
      </div>
    </div>
  );
};
