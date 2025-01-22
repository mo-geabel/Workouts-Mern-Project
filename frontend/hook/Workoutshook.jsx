import { UseContextWorkouts } from "../src/context/UseContextWorkouts";
import { useContext } from "react";
export const WorkoutsHook = () => {
  const context = useContext(UseContextWorkouts);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutsProvider");
  }
  return context;
};
