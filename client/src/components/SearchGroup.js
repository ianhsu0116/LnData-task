import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DataService from "../services/data.service";

export const SearchGroup = (props) => {
  const {
    setTotalPages,
    setCurrentData,
    searchValue = {
      team_name: "",
      keywords: "",
    },
    setSearchValue,
    setChartOpen,
  } = props;

  // const [searchValue, setSearchValue] = useState({
  //   team_name: "",
  //   keywords: "",
  // });

  // 當前拿到的所有資料
  const [totalTeams, setTotalTeams] = useState([]);

  // 初次render，跟DB拿取資料
  useState(async () => {
    // console.log(page);
    // console.log(perPage);
    try {
      // 拿所有球隊名稱
      let allTeams = await DataService.getAllTeams();

      // 放入state
      setTotalTeams(allTeams.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 即時抓取input更新
  const handleValueChange = (e) => {
    setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
  };

  // 送出搜尋
  const handleSearch = async () => {
    // console.log(searchValue);
    const { keywords, team_name } = searchValue;

    if (keywords && team_name) {
      window.location.href = `http://localhost:3000/?page=1&perPage=15&team_name=${team_name}&keywords=${keywords}`;
    } else if (team_name) {
      window.location.href = `http://localhost:3000/?page=1&perPage=15&team_name=${team_name}`;
    } else if (keywords) {
      window.location.href = `http://localhost:3000/?page=1&perPage=15&keywords=${keywords}`;
    } else {
      window.location.href = `http://localhost:3000/`;
    }
    // try {
    //   let result = await DataService.search(searchValue);
    //   //console.log(result);

    //   // 放入state
    //   setCurrentData(result.data.data);

    //   // 計算總共需要幾頁
    //   let { dataCount } = result.data.dataCount;
    //   setTotalPages(Math.ceil(dataCount / 15));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="SearchGroup">
      <div className="SearchGroup-con">
        <div className="SearchGroup-con-top">
          <label htmlFor="team">Team: </label>
          <select name="team_name" id="team" onChange={handleValueChange}>
            <option value="all">All</option>
            {totalTeams.map((i, index) => (
              <option key={index} value={i.team_name}>
                {i.team_name}
              </option>
            ))}
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
        <button
          className="SearchGroupShowCharts-btn"
          onClick={(e) => {
            e.stopPropagation();
            setChartOpen(true);
          }}
        >
          Show Charts
        </button>
      </div>
    </div>
  );
};
