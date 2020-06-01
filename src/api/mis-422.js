import axios from "axios";
import { getCookie } from "../utils/cookie";

export default axios.create({
  baseURL: "https://mis-422.herokuapp.com",
  headers: { "Content-Type": "application/json", authorization: "Bearer " + getCookie("token") },
});
