import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Pagination } from "./Pagination";
import DataService from "../services/data.service";
import { SearchGroup } from "./SearchGroup";

export const TableGroup = (props) => {
  const { totalPages, setTotalPages, currentData, setCurrentData } = props;

  // 拿取pathname中的query值
  const search = useLocation().search;
  // 有就會拿到對應的值，沒有則return null
  const page = new URLSearchParams(search).get("page") || 1;
  const perPage = new URLSearchParams(search).get("perPage") || 15;

  // // 所有資料總共需要幾頁
  // const [totalPages, setTotalPages] = useState(10);

  // // 當前拿到的所有資料
  // const [currentData, setCurrentData] = useState([]);

  // 當前搜尋的關鍵字
  const [searchValue, setSearchValue] = useState({
    team_name: "",
    keywords: "",
  });

  // 初次render，跟DB拿取資料
  useState(async () => {
    // console.log(page);
    // console.log(perPage);
    try {
      // 拿球員資料
      let result = await DataService.getData(page, perPage);

      // 放入state
      setCurrentData(result.data.data);

      // 計算總共需要幾頁
      let { dataCount } = result.data.dataCount;
      setTotalPages(Math.ceil(dataCount / perPage));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 點擊換頁
  const handleChangePage = async (page) => {
    // console.log(page);
    // console.log(perPage);
    try {
      let result;
      if (searchValue.team_name || searchValue.keywords) {
        let searchValue1 = {
          team_name: searchValue.team_name,
          keywords: searchValue.keywords,
          page: page,
          perPage: 15,
        };
        result = await DataService.search(searchValue1);
        console.log(result);
      } else {
        result = await DataService.getData(page, perPage);
      }

      // 放入state
      setCurrentData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 點擊詳細內容
  const handleOpenDetail = (id) => {
    console.log(id);
  };

  return (
    <div className="TableGroup">
      <SearchGroup
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setTotalPages={setTotalPages}
        setCurrentData={setCurrentData}
      />
      <div className="TableGroup-con">
        <table className="Table">
          <tr className="Table-tr">
            <th className="Table-th-large">Name</th>
            <th>Team</th>
            <th className="Table-th-large">TeamName</th>
            <th>Games</th>
            <th>MPG</th>
            <th>FGA</th>
            <th>FGM</th>
            <th>FG%</th>
            <th>FT%</th>
            <th>3PA</th>
            <th>3PM</th>
            <th>3PT%</th>
            <th>Points</th>
            <th>ORebounds</th>
            <th>DRebounds</th>
            <th>Rebounds</th>
            <th>Assists</th>
            <th>Steals</th>
            <th>Blocks</th>
            <th>Turnovers</th>
            <th>Efficiency</th>
            <th>Details</th>
          </tr>

          {currentData.map((data) => (
            <tr className="Table-tr">
              <td className="">{data.name}</td>
              <td>{data.team_acronym}</td>
              <td>{data.team_name}</td>
              <td>{data.games_played}</td>
              <td>{data.minutes_per_game}</td>
              <td>{data.field_goals_attempted_per_game}</td>
              <td>{data.field_goals_made_per_game}</td>
              <td>{data.field_goal_percentage}</td>
              <td>{data.free_throw_percentage}</td>
              <td>{data.three_point_attempted_per_game}</td>
              <td>{data.three_point_made_per_game}</td>
              <td>{data.three_point_percentage}</td>
              <td>{data.points_per_game}</td>
              <td>{data.offensive_rebounds_per_game}</td>
              <td>{data.defensive_rebounds_per_game}</td>
              <td>{data.rebounds_per_game}</td>
              <td>{data.assists_per_game}</td>
              <td>{data.steals_per_game}</td>
              <td>{data.blocks_per_game}</td>
              <td>{data.turnovers_per_game}</td>
              <td>{data.player_efficiency_rating}</td>
              <td
                className="Table-detail"
                onClick={() => {
                  handleOpenDetail(data.id);
                }}
              >
                <BsSearch className="searchBtn" />
              </td>
            </tr>
          ))}
        </table>
      </div>
      <Pagination totalPages={totalPages} handleChangePage={handleChangePage} />
    </div>
  );
};
