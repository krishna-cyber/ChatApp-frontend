import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./userContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <Router>
      <App />
    </Router>
  </UserContextProvider>
);
