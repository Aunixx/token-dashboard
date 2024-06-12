import apiClient from "./apiClient";

const tokenServices = {
  getTokenData: async (contractAddress, vsCurrency) => {
    try {
      const response = await apiClient.get(
        `/coins/ethereum/contract/${contractAddress}`,
        {
          params: {
            vs_currency: vsCurrency,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getTokenChartData: async (contractAddress, vsCurrency, days) => {
    try {
      const response = await apiClient.get(
        `/coins/ethereum/contract/${contractAddress}/market_chart`,
        {
          params: {
            vs_currency: vsCurrency,
            days: days,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default tokenServices;
