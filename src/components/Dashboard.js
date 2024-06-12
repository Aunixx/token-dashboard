/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TokenSearch from "./TokenSearch";
import TokenDetails from "./TokenDetails";
import TokenChart from "./TokenChart";
import tokenServices from "../services/api/tokenServices";

const Dashboard = ({ connectionType, setConnectionType }) => {
  const [address, setAddress] = useState();
  const [chartData, setChartData] = useState();
  const [tokenData, setTokenData] = useState();
  const [days, setDays] = useState();
  const [chartType, setChartType] = useState("price");
  const [isPositive, setIsPositive] = useState(null);

  const fetchChartData = async () => {
    if (address) {
      const data = await tokenServices.getTokenChartData(
        address,
        "usd",
        days ?? 1
      );
      setChartData(data);
      console.log(chartData);
    }
  };

  const fetchTokenData = async () => {
    if (address) {
      const data = await tokenServices.getTokenData(address, "usd");
      setTokenData(data);
      setIsPositive(data?.market_data.price_change_percentage_24h > 0);
      console.log(data?.market_data.price_change_percentage_24h);
    }
  };

  const handleSearch = async (address) => {
    setAddress(address);
  };

  useEffect(() => {
    fetchChartData();
  }, [days, address]);

  useEffect(() => {
    fetchTokenData();
  }, [address]);

  return (
    <div className="dashboard-wrapper">
      {/* <button onClick={handleClick}>Disconnect</button> */}
      <div className="token-search-wrapper">
        <TokenSearch onSearch={handleSearch} />
      </div>
      {chartData && isPositive !== null && (
        <div className="token-detail-wrapper">
          <TokenDetails tokenData={tokenData} />
          <TokenChart
            setDays={setDays}
            days={days}
            chartData={chartData}
            chartType={chartType}
            isPositive={isPositive}
            setChartType={setChartType}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
