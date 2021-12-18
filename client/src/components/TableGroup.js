import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { SearchGroup } from "./SearchGroup";
import { Pagination } from "./Pagination";
import { Chart } from "./Chart";
import DataService from "../services/data.service";
import { BsSearch } from "react-icons/bs";
import { RiArrowUpDownLine } from "react-icons/ri";

export const TableGroup = (props) => {
  const { totalPages, setTotalPages, currentData, setCurrentData } = props;
  const navigate = useNavigate();

  // 拿取pathname中的query值
  const search = useLocation().search;
  // 有就會拿到對應的值，沒有則return null
  const page = new URLSearchParams(search).get("page") || 1;
  const perPage = new URLSearchParams(search).get("perPage") || 15;
  let team_name = new URLSearchParams(search).get("team_name") || "";
  const keywords = new URLSearchParams(search).get("keywords") || "";
  const order_by = new URLSearchParams(search).get("order_by") || "";
  const order_type = new URLSearchParams(search).get("order_type") || "";

  // 當前搜尋的關鍵字
  const [searchValue, setSearchValue] = useState({
    team_name: "",
    keywords: "",
  });

  // 圖表開啟狀態
  const [chartOpen, setChartOpen] = useState(false);

  // 圖表需要的資料
  const [chartData, setChartData] = useState({});

  const refreshFunction = async () => {
    try {
      let result;

      // 如果是all的話，直接跑getData API即可
      team_name = team_name === "all" ? undefined : team_name;

      //如果有搜尋條件 + 指定頁碼
      if (
        (team_name || keywords || order_by || order_type) &&
        page &&
        perPage
      ) {
        result = await DataService.search({
          team_name: team_name || "",
          keywords: keywords || "",
          order_by: order_by || "",
          order_type: order_type || "",
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
  };

  // 偵測網址參數改變，跟DB拿取資料
  useEffect(async () => {
    window.addEventListener("click", (e) => setChartOpen(false));
    refreshFunction();
  }, [page]);
  // 偵測網址參數改變，跟DB拿取資料
  useEffect(async () => {
    refreshFunction();
  }, [team_name]);
  // 偵測網址參數改變，跟DB拿取資料
  useEffect(async () => {
    refreshFunction();
  }, [keywords]);
  // 偵測網址參數改變，跟DB拿取資料
  useEffect(async () => {
    refreshFunction();
  }, [order_by]);
  // 偵測網址參數改變，跟DB拿取資料
  useEffect(async () => {
    refreshFunction();
  }, [order_type]);

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
    // console.log(page);
  };

  // 點擊升降冪
  const compare = {
    Games: "games_played",
    Points: "points_per_game",
    Rebounds: "rebounds_per_game",
    Assists: "assists_per_game",
    Steals: "steals_per_game",
    Blocks: "blocks_per_game",
  };

  const [orderType, setOrderType] = useState("ASC");
  const handleAscDesc = async (type) => {
    // toggle 升降冪
    setOrderType(orderType === "DESC" ? "ASC" : "DESC");

    // 改變網址參數
    navigate(
      `/?page=${page}&perPage=${perPage}${
        team_name ? `&team_name=${team_name}` : ""
      }${keywords ? `&keywords=${keywords}` : ""}${
        compare[type] ? `&order_by=${compare[type]}` : ""
      }${orderType ? `&order_type=${orderType}` : ""}`
    );
  };

  return (
    <div className="TableGroup">
      <SearchGroup
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setChartOpen={setChartOpen}
      />
      <div className="TableGroup-con">
        <table className="Table">
          <tr className="Table-tr">
            <th className="Table-th Table-th-large">Name</th>
            <th className="Table-th">Team</th>
            <th className="Table-th Table-th-large">TeamName</th>
            <th
              className={`Table-th Table-th-btn ${
                order_by === compare["Games"] ? "Table-th-btnActive" : ""
              }`}
              onClick={() => handleAscDesc("Games")}
            >
              Games <RiArrowUpDownLine />
            </th>
            <th className="Table-th">MPG</th>
            <th className="Table-th">FGA</th>
            <th className="Table-th">FGM</th>
            <th className="Table-th">FG%</th>
            <th className="Table-th">FT%</th>
            <th className="Table-th">3PA</th>
            <th className="Table-th">3PM</th>
            <th className="Table-th">3PT%</th>
            <th
              className={`Table-th Table-th-btn ${
                order_by === compare["Points"] ? "Table-th-btnActive" : ""
              }`}
              onClick={() => handleAscDesc("Points")}
            >
              Points
              <RiArrowUpDownLine />
            </th>
            <th className="Table-th">ORebounds</th>
            <th className="Table-th">DRebounds</th>
            <th
              className={`Table-th Table-th-btn ${
                order_by === compare["Rebounds"] ? "Table-th-btnActive" : ""
              }`}
              onClick={() => handleAscDesc("Rebounds")}
            >
              Rebounds
              <RiArrowUpDownLine />
            </th>
            <th
              className={`Table-th Table-th-btn ${
                order_by === compare["Assists"] ? "Table-th-btnActive" : ""
              }`}
              onClick={() => handleAscDesc("Assists")}
            >
              Assists
              <RiArrowUpDownLine />
            </th>
            <th
              className={`Table-th Table-th-btn ${
                order_by === compare["Steals"] ? "Table-th-btnActive" : ""
              }`}
              onClick={() => handleAscDesc("Steals")}
            >
              Steals
              <RiArrowUpDownLine />
            </th>
            <th
              className={`Table-th Table-th-btn ${
                order_by === compare["Blocks"] ? "Table-th-btnActive" : ""
              }`}
              onClick={() => handleAscDesc("Blocks")}
            >
              Blocks
              <RiArrowUpDownLine />
            </th>
            <th className="Table-th">Turnovers</th>
            <th className="Table-th">Efficiency</th>
            <th className="Table-th">Details</th>
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
        defaultPage={page > totalPages || page <= 0 ? 1 : page}
        totalPages={totalPages}
        handleChangePage={handleChangePage}
      />

      {/* 圖表元件 */}
      {chartOpen && <Chart chartData={chartData} />}
    </div>
  );
};
