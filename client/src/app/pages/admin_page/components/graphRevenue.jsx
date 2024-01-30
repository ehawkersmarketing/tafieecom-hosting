import React, { useState, useEffect } from "react";
import { useFetch } from "../../../hooks/api_hook";
import { Chart } from "react-google-charts";
const GraphRevenue = () => {
  const { data: orders } = useFetch("/api/getAllOrders");
  const [revenueMap, setRevenueState] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });
  const [data, setData] = useState([
    ["x", "orders"],
    ["Jan", revenueMap.Jan],
    ["Feb", revenueMap.Feb],
    ["Mar", revenueMap.Mar],
    ["Apr", revenueMap.Apr],
    ["May", revenueMap.May],
    ["Jun", revenueMap.Jun],
    ["Jul", revenueMap.Jul],
    ["Aug", revenueMap.Aug],
    ["Sep", revenueMap.Sep],
    ["Oct", revenueMap.Oct],
    ["Nov", revenueMap.Nov],
    ["Dec", revenueMap.Dec],
  ]);

  const options = {
    hAxis: {
      title: "Time",
    },
    vAxis: {
      title: "Revenue",
    },
    series: {
      1: { curveType: "function" },
    },
  };

  useEffect(() => {
    if (orders) {
      let total = 0;
      let jan = 0;
      let feb = 0;
      let mar = 0;
      let apr = 0;
      let may = 0;
      let jun = 0;
      let jul = 0;
      let aug = 0;
      let sep = 0;
      let oct = 0;
      let nov = 0;
      let dec = 0;
      for (let i = 0; i < orders?.length; i++) {
        total = orders[i]?.amount;
        console.log(new Date(orders[i].timestamps).getMonth(), total);
        switch (new Date(orders[i].timestamps).getMonth()) {
          case 0:
            console.log("setting data", `${jan + total}`);
            jan+=total;
            break;
          case 1:
            feb+=total;
            break;
          case 2:
            mar+=total;
            break;
          case 3:
            
              apr+=total
            break;
          case 4:
            may+=total;
            break;
          case 5:
            jun+=total
            break;
          case 6:
            jul+=total
            break;
          case 7:
            aug+=total
            break;
          case 8:
            sep+=total
            break;
          case 9:
            oct+=total
            break;
          case 10:
            nov+=total
            break;
          case 11:
            dec+=total
            break;
          default:
            break;
        }
        setRevenueState({
            Jan: jan,
            Feb: feb,
            Mar: mar,
            Apr:apr,
            May:may,
            Jun:jun,
            Jul:jul,
            Aug:aug,
            Sep:sep,
            Oct:oct,
            Nov:nov,
            Dec:dec
        });
        console.log(revenueMap);
      }
      setData([
        ["x", "orders"],
        ["Jan", revenueMap.Jan],
        ["Feb", revenueMap.Feb],
        ["Mar", revenueMap.Mar],
        ["Apr", revenueMap.Apr],
        ["May", revenueMap.May],
        ["Jun", revenueMap.Jun],
        ["Jul", revenueMap.Jul],
        ["Aug", revenueMap.Aug],
        ["Sep", revenueMap.Sep],
        ["Oct", revenueMap.Oct],
        ["Nov", revenueMap.Nov],
        ["Dec", revenueMap.Dec],
      ]);
    }
  }, [orders]);

  return (
    <div style={{ marginTop: "0px" }}>
    <Chart
      chartType="LineChart"
      width="100%"
      height="200px"
      data={data}
      options={options}
    />
  </div>
  );
};
export default GraphRevenue;
