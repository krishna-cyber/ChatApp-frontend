import axios from "axios";

const server = axios.create({
  baseURL: "https://backendchatappbykrishna.onrender.com",
  withCredentials: true,
});

export default server;
