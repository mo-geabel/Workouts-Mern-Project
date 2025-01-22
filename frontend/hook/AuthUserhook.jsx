import { Authcontext } from "../src/context/UseContextUser";
import { useContext } from "react";
export const AuthUserhook = () => {
  const context = useContext(Authcontext);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutsProvider");
  }
  return context;
};
