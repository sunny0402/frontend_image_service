import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "http://ec2-44-203-186-236.compute-1.amazonaws.com:5000/api";

export default axios.create({
  baseURL: BASE_URL,
});

//to refresh tokens in background
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
