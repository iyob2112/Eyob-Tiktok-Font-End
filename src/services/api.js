import axios from "axios";

const api = axios.create({
  baseURL: "https://eyob-tiktok-back-end.onrender.com/api",
});

export default api;