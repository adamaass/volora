import React from "react";
import { createRoot } from "react-dom/client";
import VoloraGenZ from "./pages/volora-genz.jsx";

if (!document.querySelector("style[data-volora-reset]")) {
  const reset = document.createElement("style");
  reset.setAttribute("data-volora-reset", "");
  reset.textContent = "*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}";
  document.head.appendChild(reset);
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VoloraGenZ />
  </React.StrictMode>,
);
