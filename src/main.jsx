import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: "12px", background: "#111827", color: "#fff", },}} />
    <AppRouter />
  </React.StrictMode>
);