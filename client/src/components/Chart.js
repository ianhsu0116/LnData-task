import React, { useState, useEffect } from "react";

export const Chart = (props) => {
  const { chartData } = props;
  // console.log(chartData);

  const [percentForEach, setPercentForEach] = useState([]);

  useEffect(() => {
    let total = 0;
    let arr = [];

    // 先算出總數
    for (let i in chartData) {
      // console.log(chartData[i].length);
      total += chartData[i].length;
    }

    // 每一球隊人數 / 總數，拿到平均值
    for (let i in chartData) {
      let data = {
        team_name: i,
        percent: chartData[i].length / total,
      };

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
        <div className="Chart-main-top">Chart!</div>
        <div className="Chart-main-bottom"></div>
      </div>
    </div>
  );
};
