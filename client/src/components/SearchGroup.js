import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DataService from "../services/data.service";

export const SearchGroup = (props) => {
  const {
    searchValue = {
      team_name: "",
      keywords: "",
    },
    setSearchValue,
    setChartOpen,
  } = props;

  const navigate = useNavigate();

  // 當前拿到的所有資料
  const [totalTeams, setTotalTeams] = useState([]);

  // 初次render，跟DB拿取資料
  useState(async () => {
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

    let url = `/?page=1&perPage=15${
      team_name ? `&team_name=${team_name}` : ""
    }${keywords ? `&keywords=${keywords}` : ""}`;

    // 導入新的網址
    navigate(url);
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
