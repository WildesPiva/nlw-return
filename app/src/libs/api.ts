import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.7.9:3333",
});
