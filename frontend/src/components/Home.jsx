import React from "react";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import Details from "./Details";
import Form from "./form";
import { WorkoutsHook } from "../../hook/Workoutshook";
import { AuthUserhook } from "../../hook/AuthUserhook";

const Home = () => {
  const { workouts, dispatch } = WorkoutsHook();
  const [update, setUpdate] = useState(false);
  const { user } = AuthUserhook();
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("/api/workouts/", {
          headers: { authorization: `Bearer ${user.token}` },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }
        const data = await res.json();
        console.log("Response:", res);
        console.log("Data:", data);
        dispatch({ type: "SET_WORKOUTS", payload: data });
      } catch (error) {
        console.error("Error fetching workouts:", error.message);
      }
    };
    if (user) {
      fetchWorkouts();
    } else {
      dispatch({ type: "RESET_WORKOUTS" }); // Reset workouts on logout
    }
  }, [dispatch, user]); // Add `dispatch` if it's stable and doesn't change

  return (
    <div className="home">
      <div className="workouts">
        <h2>Home</h2>
        {workouts &&
          workouts.map((workout) => (
            <div key={workout._id}>
              <Details workouts={workout}> </Details>
            </div>
          ))}
      </div>
      <Form></Form>
    </div>
  );
};

export default Home;
