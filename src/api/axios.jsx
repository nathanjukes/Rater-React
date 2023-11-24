import axios from "axios";

const BASE_URL = process.env.REACT_APP_RATERMANAGEMENTURL;
const BASE_URL_RATE_CONTROL = process.env.REACT_APP_RATERRATECONTROLURL;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateRateControl = axios.create({
  baseURL: BASE_URL_RATE_CONTROL,
  headers: {
    "Content-Type": "application/json",
  },
});
