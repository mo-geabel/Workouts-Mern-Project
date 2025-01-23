import React, { useState } from "react";
import { WorkoutsHook } from "../../hook/Workoutshook";
import { AuthUserhook } from "../../hook/AuthUserhook";

const Form = ({ workout, update, setupdate }) => {
  const [load, setload] = useState("");
  const [reps, setreps] = useState("");
  const [title, settitle] = useState("");
  const [error, seterror] = useState(null);
  const { dispatch } = WorkoutsHook();
  const { user } = AuthUserhook();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return seterror("You must be logged in"), e.preventDefault();
    }
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, load, reps }),
    });
    const json = await response.json();
    if (!response.ok) {
      return seterror(json.err);
    }
    console.log(json.err);
    dispatch({ type: "ADD_WORKOUT", payload: json });
    if (response.ok) {
      setload("");
      setreps("");
      settitle("");
      seterror(null);

      console.log("the form is submited easily", json);
    }
    console.log(update);
  };

  return (
    <div>
      {update ? (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add New Workout</h3>

          <label>Add excirsize Title</label>
          <input
            type="text"
            required
            onChange={(e) => settitle(e.target.value)}
            value={title}
          />
          <label>Add excirsize load (kg)</label>
          <input
            type="number"
            onChange={(e) => setload(e.target.value)}
            value={load}
          />
          <label>Add excirsize reps</label>
          <input
            type="number"
            required
            onChange={(e) => setreps(e.target.value)}
            value={reps}
          />
          <button>Update</button>
          {error && <div className="error">{error}</div>}
        </form>
      ) : (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Add New Workout</h3>

          <label>Add excirsize Title</label>
          <input
            type="text"
            required
            onChange={(e) => settitle(e.target.value)}
            value={title}
          />
          <label>Add excirsize load (kg)</label>
          <input
            type="number"
            onChange={(e) => setload(e.target.value)}
            value={load}
          />
          <label>Add excirsize reps</label>
          <input
            type="number"
            required
            onChange={(e) => setreps(e.target.value)}
            value={reps}
          />
          <button>submit</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default Form;
