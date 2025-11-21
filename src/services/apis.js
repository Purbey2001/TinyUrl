import axios from "axios";

const API = axios.create({
  baseURL: "https://tinyurl-67q8.onrender.com", // backend URL
});

export default API;