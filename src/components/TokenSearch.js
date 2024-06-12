import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const TokenSearch = ({ onSearch }) => {
  const [tokenAddress, setTokenAddress] = useState("");

  const handleSearch = () => {
    onSearch(tokenAddress);
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Enter token address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button onClick={handleSearch}>
        <CiSearch />
      </button>
    </div>
  );
};

export default TokenSearch;
