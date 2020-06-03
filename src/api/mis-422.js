import axios from "axios";
import {getCookie, setCookie} from "../utils/cookie";


let axiosInstance = axios.create({
  baseURL: "https://mis-422.herokuapp.com",
  headers: { "Content-Type": "application/json", authorization: "Bearer " + getCookie("token") },
});

axiosInstance.interceptors.response.use((response) => response, async (error) => {
  if (error.response.status === 401) {
    let password = new Buffer(getCookie('userid'), 'base64').toString('ascii');
    let username = new Buffer(getCookie('user'), 'base64').toString('ascii');
    let tokenRes = await axiosInstance.post("/api/authenticate", {username, password});
    setCookie("token", tokenRes.data.id_token, {});
    window.location.reload();
  } else {
    return error;
  }
});

export default axiosInstance;
