import { ACCESS_TOKEN_KEY } from "../constant/token_constant";
import axios from "axios";
import token from "../lib/token/token";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (!token.getToken(ACCESS_TOKEN_KEY)) return config;

  config.headers = {
    "Content-type": "application/json",
    Authorization: token.getToken(ACCESS_TOKEN_KEY),
  };

  return config;
});

export default api;
