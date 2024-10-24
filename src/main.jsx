import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@descope/react-sdk";
import App from "./App";

const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider projectId={import.meta.env.VITE_DESCOPE_PROJECT_ID}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
