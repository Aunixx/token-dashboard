import { MdOutlineArrowDropDown } from "react-icons/md";

const TokenDetails = ({ tokenData }) => {
  if (!tokenData) return <p>No data available</p>;

  function isValuePositive() {
    return tokenData.market_data.price_change_percentage_24h > 0;
  }

  return (
    <div className="token-detail">
      <div className="header">
        <img src={tokenData.image.small} alt="token thumbnail" />
        <h2 className="token-name">{tokenData.name}</h2>
        <span>({tokenData.symbol.toUpperCase()})</span>
      </div>
      <div className="price-details">
        <p className="price">${tokenData.market_data.current_price.usd}</p>
        <span
          className={`${
            isValuePositive() ? "positive" : "negative"
          } change-percentage`}
        >
          {<MdOutlineArrowDropDown />}
          {Math.abs(
            tokenData.market_data.price_change_percentage_24h.toFixed(2)
          )}
          % (1d)
        </span>
      </div>
      <ul className="more-details">
        <li className="more-details-item">
          <span className="title">Market Cap</span>
          <span className="data">${tokenData.market_data.market_cap.usd}</span>
        </li>
        <li className="more-details-item">
          <span className="title">Total Volume</span>
          <span className="data">
            ${tokenData.market_data.total_volume.usd}
          </span>
        </li>
        <li className="more-details-item">
          <span className="title">FDV</span>
          <span className="data">
            ${tokenData.market_data.fully_diluted_valuation.usd}
          </span>
        </li>
        <li className="more-details-item">
          <span className="title">Market Cap Rank</span>
          <span className="data">{tokenData.market_data.market_cap_rank}</span>
        </li>
        <li className="more-details-item">
          <span className="title">Circulating Supply</span>
          <span className="data">
            {tokenData.market_data.circulating_supply}
          </span>
        </li>
        <li className="more-details-item">
          <span className="title">Max Supply</span>
          <span className="data">{tokenData.market_data.max_supply}</span>
        </li>
        <li className="more-details-item">
          <span className="title">Total Supply</span>
          <span className="data">{tokenData.market_data.total_supply}</span>
        </li>
      </ul>
    </div>
  );
};

export default TokenDetails;
