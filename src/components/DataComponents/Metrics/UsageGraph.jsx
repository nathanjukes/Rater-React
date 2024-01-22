import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const UsageGraph = ({ data }) => {
  const [chartData, setChartData] = useState({
    options: {
      stroke: {
        curve: "smooth",
        colors: ["#3d384e"],
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            if (val === 1) {
              return val + " request";
            }
            return val + " requests";
          },
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
      },
    },
    series: [
      {
        data: [],
      },
    ],
  });

  useEffect(() => {
    const formattedData = data.map(([timestamp, value]) => ({
      x: new Date(timestamp).toLocaleTimeString(),
      y: value,
    }));

    setChartData({
      options: {
        ...chartData.options,
        xaxis: {
          categories: formattedData.map((item) => item.x),
          title: {
            text: "Time",
          },
        },
        yaxis: {
          title: {
            text: "Requests",
          },
        },
      },
      series: [
        {
          data: formattedData.map((item) => item.y),
        },
      ],
    });
  }, [data]);

  return (
    <div className="line">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width={2000}
        height={400}
      />
    </div>
  );
};

export default UsageGraph;
