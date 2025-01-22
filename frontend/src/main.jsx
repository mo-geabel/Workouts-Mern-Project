import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UseContextWorkoutsProvider } from "./context/UseContextWorkouts.jsx";
import { AuthcontextProvider } from "./context/UseContextUser.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthcontextProvider>
      <UseContextWorkoutsProvider>
        <App />
      </UseContextWorkoutsProvider>
    </AuthcontextProvider>
  </StrictMode>
);
