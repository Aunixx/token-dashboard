import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  headers: {
    "Content-Type": "application/json",
    'x-cg-demo-api-key': 'CG-5exJQteBHAR6RgdZeHNpEzAs'
  },
});

export default apiClient;