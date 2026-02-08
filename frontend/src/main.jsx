import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { AppProvider } from "./app/providers/AppProvider";
import "./styles/globals.css";

/**
 * Entry point of the application
 * Wraps app with:
 * - BrowserRouter (routing)
 * - AppProvider (global state)
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
