import Axios from "axios";
import { env } from "process";

export const api = Axios.create({
  baseURL: env.FETCH_FETAKEHOME_BASE_API_UR,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  }
});
api.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));
