import axios from "axios";

const BASE_URL = "http://localhost:8080/rater/api/v1";
//const BASE_URL = "http://188.166.9.118:8080/rater/api/v1";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});