import axios from "axios";

const api = axios.create({
  // baseURL: "https://eyob-tiktok-back-end.onrender.com/api",
  baseURL: "http://localhost:5000/api",
});


// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 handle unauthorized globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      // token invalid or expired
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;