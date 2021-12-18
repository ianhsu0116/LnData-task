import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { SearchGroup } from "./SearchGroup";
import { Pagination } from "./Pagination";
import { Chart } from "./Chart";
import DataService from "../services/data.service";
import { BsSearch } from "react-icons/bs";

export const TableGroup = (props) => {
  const { totalPages, setTotalPages, currentData, setCurrentData } = props;

  // 拿取pathname中的query值
  const search = useLocation().search;
  // 有就會拿到對應的值，沒有則return null
  const page = new URLSearchParams(search).get("page") || 1;
  const perPage = new URLSearchParams(search).get("perPage") || 15;
  let team_name = new URLSearchParams(search).get("team_name") || "";
  const keywords = new URLSearchParams(search).get("keywords") || "";

  // 當前搜尋的關鍵字
  const [searchValue, setSearchValue] = useState({
    team_name: "",
    keywords: "",
  });

  // 圖表開啟狀態
  const [chartOpen, setChartOpen] = useState(false);

  // 圖表需要的資料
  const [chartData, setChartData] = useState({});

  // 初次render，跟DB拿取資料
  useEffect(async () => {
    window.addEventListener("click", (e) => setChartOpen(false));
    // console.log(page);
    // console.log(perPage);
    try {
      let result;

      // 如果是all的話，直接跑getData API即可
      team_name = team_name === "all" ? undefined : team_name;

      //如果有搜尋條件 + 指定頁碼
      if ((team_name || keywords) && page && perPage) {
        result = await DataService.search({
          team_name,
          keywords,
          page,
          perPage,
        });
        //console.log(result);
      }

      //如果沒有搜尋條件
      else {
        // 拿球員資料
        result = await DataService.getData(page, perPage);
      }

      // 放入state
      setCurrentData(result.data.data);

      // 計算總共需要幾頁
      let { dataCount } = result.data.dataCount;
      setTotalPages(Math.ceil(dataCount / perPage));
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }, [page]);

  // 圖表打開時 傳入對應資料
  useEffect(async () => {
    try {
      let result = await DataService.getLess15Players();
      // console.log(result);
      setChartData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [chartOpen]);

  // 點擊換頁
  const handleChangePage = async (pages) => {
    console.log(page);
    // console.log(perPage);
    // try {
    //   let result;
    //   if (searchValue.team_name || searchValue.keywords) {
    //     let searchValue1 = {
    //       team_name: searchValue.team_name,
    //       keywords: searchValue.keywords,
    //       page: page,
    //       perPage: 15,
    //     };
    //     result = await DataService.search(searchValue1);
    //     console.log(result);
    //   } else {
    //     result = await DataService.getData(page, perPage);
    //   }

    //   // 放入state
    //   setCurrentData(result.data.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="TableGroup">
      <SearchGroup
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setTotalPages={setTotalPages}
        setCurrentData={setCurrentData}
        setChartOpen={setChartOpen}
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

          {currentData.map((data, index) => (
            <tr className="Table-tr" key={index}>
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
              <td className="Table-detail">
                <Link to={`/players/${data.id}`} state={{ playerData: data }}>
                  <BsSearch className="searchBtn" />
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>

      {/* 分頁元件 */}
      <Pagination
        defaultPage={page}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />

      {/* 圖表元件 */}
      {chartOpen && <Chart chartData={chartData} />}
    </div>
  );
};
