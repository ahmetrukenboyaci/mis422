import axios from "axios";
import {getCookie, setCookie} from "../utils/cookie";


let axiosInstance = axios.create({
  baseURL: "https://mis-422.herokuapp.com",
  headers: { "Content-Type": "application/json", authorization: "Bearer " + getCookie("token") },
});

axiosInstance.interceptors.response.use((response) => response, async (error) => {
  if (error.response.status === 401) {
    setCookie("token", "", {});
    window.location.reload();
  } else {
    return error;
  }
});

export default axiosInstance;
