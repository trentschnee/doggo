import Axios from "axios";
import { env } from "process";

export const api = Axios.create({
  baseURL: env.API_URL,
});

// todo: auth request interceptor