import Axios from "axios";
import { env } from "process";

export const api = Axios.create({
  baseURL: env.FETCH_FETAKEHOME_BASE_API_UR,
});

// todo: auth request interceptor