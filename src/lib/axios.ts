import Axios from "axios";
const env = import.meta.env;
export const httpClient = Axios.create({
  baseURL: env.VITE_FETCH_FETAKEHOME_BASE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  }
});
