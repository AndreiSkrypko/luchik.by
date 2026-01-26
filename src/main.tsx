import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Ensure root exists and handle errors
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

// Mark as React root for fallback detection
rootElement.classList.add("react-root");

// Clear any fallback content before rendering
const fallbackContent = rootElement.querySelector('div[style*="min-height: 100vh"]');
if (fallbackContent) {
  fallbackContent.remove();
}

createRoot(rootElement).render(<App />);
