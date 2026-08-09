import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:9090",
});
http.defaults.headers.common["Content-Type"] = "application/json";

export default http;
