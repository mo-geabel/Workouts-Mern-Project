import { createContext, useReducer } from "react";

export const UseContextWorkouts = createContext();

export const UseContextWorkoutsProvider = ({ children }) => {
  const Reducer = (State, action) => {
    switch (action.type) {
      case "SET_WORKOUTS":
        return { workouts: action.payload };
      case "ADD_WORKOUT":
        return { workouts: [...State.workouts, action.payload] };
      case "DELETE_WORKOUT":
        return {
          workouts: State.workouts.filter((workout) => {
            return workout._id !== action.payload;
          }),
        };
      case "UPDATE_WORKOUT":
        return {
          workouts: State.workouts.map((workout) =>
            workout._id === action.payload._id ? action.payload : workout
          ),
        };
      default:
        return State;
    }
  };
  const [State, dispatch] = useReducer(Reducer, { workouts: [] });
  return (
    <UseContextWorkouts.Provider value={{ ...State, dispatch }}>
      {children}
    </UseContextWorkouts.Provider>
  );
};
