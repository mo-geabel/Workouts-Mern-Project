import { AuthUserhook } from "./AuthUserhook";

export const useLogout = () => {
  const { dispatch } = AuthUserhook(); // Ensure this hook is used within a component or another hook

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    console.log("Logout successful");
  };

  return logout;
};
