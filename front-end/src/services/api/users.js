import axios from "axios";
const API_URL = "https://localhost/back-end/api";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login.php`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
