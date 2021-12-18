import React from "react";
import { useLocation } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";

// 每一個參數對應的欄位
let compare = {
  Name: "name",
  Team: "team_acronym",
  TeamName: "team_name",
  Games: "games_played",
  MPG: "minutes_per_game",
  FGA: "field_goals_attempted_per_game",
  FGM: "field_goals_made_per_game",
  "FG%": "field_goal_percentage",
  "FT%": "free_throw_percentage",
  "3PA": "three_point_attempted_per_game",
  "3PM": "three_point_made_per_game",
  "3PT%": "three_point_percentage",
  Points: "points_per_game",
  ORebounds: "offensive_rebounds_per_game",
  DRebounds: "defensive_rebounds_per_game",
  Rebounds: "rebounds_per_game",
  Assists: "assists_per_game",
  Steals: "steals_per_game",
  Blocks: "blocks_per_game",
  Turnovers: "turnovers_per_game",
  Efficiency: "player_efficiency_rating",
};

// 每一個欄位顯示的值
let eachItem = [];
for (let i in compare) {
  eachItem.push(i);
}

export const PlayerDetail = () => {
  const location = useLocation();

  // 球員詳細資料
  const playerData = location.state.playerData;

  return (
    <div className="PlayerDetail">
      <header className="PlayerDetail-header">
        <IoPersonCircleOutline className="PlayerDetail-header-avatar" />

        <span>{playerData.name}</span>
      </header>
      <main className="PlayerDetail-main">
        <table className="PlayerDetail-main-table">
          {eachItem.map((i) => (
            <tr className="PlayerDetail-main-tr">
              <th className="PlayerDetail-main-th">{i}：</th>
              <td className="PlayerDetail-main-td">{playerData[compare[i]]}</td>
            </tr>
          ))}
        </table>
      </main>
    </div>
  );
};
