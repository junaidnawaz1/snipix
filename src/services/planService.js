// src/services/planService.js
import axios from "axios";

const API = "http://localhost:3000/api/plan";

export const startTrial = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${API}/trial/start`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getPlanStatus = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API}/status`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
