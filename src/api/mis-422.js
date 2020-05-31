import axios from "axios";
import { getCookie } from "../utils/cookie";

export default axios.create({
  baseURL: "https://mis-422.herokuapp.com",
  headers: { authorization: "Bearer " + getCookie("token") },
});
