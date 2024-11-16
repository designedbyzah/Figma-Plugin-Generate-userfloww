import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

document.addEventListener("DOMContentLoaded", function () {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    console.error("Root element not found! Could not mount React app.");
  }
});
