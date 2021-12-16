import React from "react";
import { useLocation, useParams, Link } from "react-router-dom";

export const TableGroup = () => {
  // 拿取pathname中的query值
  const search = useLocation().search;
  // 有就會拿到對應的值，沒有則return null
  const page = new URLSearchParams(search).get("page");
  const perPage = new URLSearchParams(search).get("perPage");

  console.log(page);
  console.log(perPage);

  return (
    <div className="TableGroup">
      <div className="TableGroup-con">
        <table className="Table">
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>TeamName</th>
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

          {new Array(15).fill(1).map(() => (
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>TeamName</th>
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
          ))}
        </table>
      </div>
    </div>
  );
};
