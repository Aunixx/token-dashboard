import Chart from "react-apexcharts";
import { timePeriods } from "../services/utils/helpers";

const TokenChart = ({
  setDays,
  chartData,
  chartType,
  setChartType,
  days,
  isPositive,
}) => {
  function getChartData(chartType, chartData) {
    return chartType === "price" ? chartData.prices : chartData.market_caps;
  }
  const handleButtonClick = (days) => {
    setDays(days);
  };
  const data = {
    series: [
      {
        name: chartType,
        data: getChartData(chartType, chartData)?.map((item, index) => ({
          x: item[0],
          y: item[1].toFixed(4),
          volume: chartData.total_volumes[index][1],
        })),
      },
    ],
    options: {
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 2,
        dashArray: 0,
        strokeColors: "#16c683",
      },
      colors: [isPositive ? "#16c683" : "#ea3943"],
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        fontFamily: "Roboto",
      },
      xaxis: {
        type: "datetime",
        title: {
          text: "date and time",
          style: {
            fontSize: "14px",
            fontFamily: "Roboto",
            cssClass: "apexcharts-yaxis-label",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: "Roboto",
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      grid: {
        show: true,
        borderColor: "rgb(55, 61, 63)",
        strokeDashArray: 2,
      },
      yaxis: {
        title: {
          text: chartType,
          style: {
            fontSize: "14px",
            fontFamily: "Roboto",
            cssClass: "apexcharts-yaxis-label",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        opposite: true,
        labels: {
          formatter: (value) => {
            return value >= 1000
              ? `$${(value / 1000).toFixed(2)}K`
              : `$${value.toFixed(2)}`;
          },
          style: {
            fontSize: "12px",
            fontFamily: "Roboto",
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        x: {
          format: "dd MMM yyyy HH:mm",
        },
        y: {
          formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
            const volume =
              w.globals.initialSeries[seriesIndex].data[dataPointIndex].volume;
            return `<div>
                        <div><strong>${chartType}:</strong> $${
              value >= 1000 ? (value / 1000).toFixed(2) + "K" : value.toFixed(4)
            }</div>
                        <div><strong>Volume:</strong> $${volume.toFixed(
                          0
                        )}</div>
                    </div>`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <div className="filters-wrapper">
        <div className="filters">
          <button
            onClick={() => setChartType("price")}
            className={chartType === "price" && "active"}
          >
            Price
          </button>
          <button
            onClick={() => setChartType("market_cap")}
            className={chartType === "market_cap" && "active"}
          >
            Market Cap
          </button>
        </div>
        <div className="filters">
          {Object.entries(timePeriods).map(([label, value]) => (
            <button
              key={label}
              onClick={() => handleButtonClick(value)}
              className={value === days && "active"}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <Chart
        options={data.options}
        series={data.series}
        type="area"
        width="100%"
        height="92%"
        className="apex-chart"
      />
    </div>
  );
};

export default TokenChart;
