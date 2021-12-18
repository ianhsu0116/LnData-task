import React, { useState, useEffect } from "react";

export const Chart = (props) => {
  const { chartData } = props;
  // console.log(chartData);

  // 每一球隊佔總人數的比例
  const [percentForEach, setPercentForEach] = useState([]);

  // 總共有多少人
  const [totalPlayer, setTotalPlayer] = useState(0);
  useEffect(() => {
    let total = 0;
    let arr = [];

    // 先算出總數
    for (let i in chartData) {
      // console.log(chartData[i].length);
      total += chartData[i].length;
    }

    setTotalPlayer(total);

    // 每一球隊人數 / 總數，拿到平均值
    for (let i in chartData) {
      let data = {
        team_name: i,
        percent: (chartData[i].length / total).toFixed(5),
        playerCount: chartData[i].length,
      };

      console.log(data.percent);

      arr.push(data);
    }

    // 將整理好的data放入state
    setPercentForEach(arr);
  }, []);

  useEffect(() => {
    console.log(percentForEach);
  }, [percentForEach]);

  return (
    <div className="Chart">
      <div className="Chart-main" onClick={(e) => e.stopPropagation()}>
        <div className="Chart-main-top">Chart</div>
        <div className="Chart-main-bottom">
          <table className="Chart-main-bottom-table">
            <tr className="Chart-main-bottom-tr">
              <th></th>
              <td></td>
              <td className="Chart-main-bottom-td-num totalPlayer">
                (共 {totalPlayer} 人)
              </td>
            </tr>
            {percentForEach.map((data) => (
              <tr className="Chart-main-bottom-tr">
                <th className="Chart-main-bottom-th">{data.team_name}</th>
                <td className="Chart-main-bottom-td">
                  <span className="Chart-main-bottom-td-percent">
                    {data.percent * 100}%
                  </span>
                  <td
                    className="Chart-main-bottom-progress"
                    width={`${data.percent * 100}%`}
                  ></td>
                </td>
                <td className="Chart-main-bottom-td-num">
                  ({data.playerCount}人)
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
