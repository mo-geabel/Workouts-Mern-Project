import { createContext, useReducer } from "react";

export const Authcontext = createContext();
export const AuthReducer = (State, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return State;
  }
};
export const AuthcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });
  return (
    <Authcontext.Provider value={{ ...state, dispatch }}>
      {children}
    </Authcontext.Provider>
  );
};
