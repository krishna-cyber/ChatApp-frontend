import axios from "axios";

const server = axios.create({
  baseURL: "https://backendchatapp-9q6k.onrender.com",
  withCredentials: true,
});

export default server;
