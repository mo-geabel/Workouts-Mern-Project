import React, { useState, useEffect } from "react";
import { WorkoutsHook } from "../../hook/Workoutshook";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { AuthUserhook } from "../../hook/AuthUserhook";
const Details = ({ workouts }) => {
  const { dispatch } = WorkoutsHook();
  const [editMode, setEditMode] = useState(false);
  const [updatedWorkout, setUpdatedWorkout] = useState({
    title: workouts.title,
    load: workouts.load,
    reps: workouts.reps,
  });
  const { user } = AuthUserhook();

  const handleDelete = async (id) => {
    if (!user) {
      return console.error("You must be logged in to delete a workout");
    }
    try {
      const res = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) {
        throw new Error("Failed to delete workout");
      }
      console.log("Deleted:", res);
      dispatch({ type: "DELETE_WORKOUT", payload: id });
    } catch (error) {
      console.error("Error deleting workout:", error.message);
    }
  };

  const handleUpdate = async (id) => {
    if (!user) {
      return console.error("You must be logged in to update a workout");
    }
    console.log("Updating workout with ID:", updatedWorkout);
    try {
      const res = await fetch(`/api/workouts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedWorkout),
      });
      console.log("Response:", res);
      if (!res.ok) {
        throw new Error("Failed to update workout");
      }
      const updatedData = await res.json();
      console.log("Updated Data:", updatedData);
      dispatch({ type: "UPDATE_WORKOUT", payload: updatedData });
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating workout:", error.message);
    }
  };

  return (
    <div className="workout-details">
      {editMode ? (
        <div>
          <input
            type="text"
            value={updatedWorkout.title}
            onChange={(e) =>
              setUpdatedWorkout({ ...updatedWorkout, title: e.target.value })
            }
          />
          <input
            type="number"
            value={updatedWorkout.load}
            onChange={(e) =>
              setUpdatedWorkout({ ...updatedWorkout, load: e.target.value })
            }
          />
          <input
            type="number"
            value={updatedWorkout.reps}
            onChange={(e) =>
              setUpdatedWorkout({ ...updatedWorkout, reps: e.target.value })
            }
          />
          <button onClick={() => handleUpdate(workouts._id)}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h4>{workouts.title}</h4>
          <p>
            <strong>Load (kg): </strong> {workouts.load}
          </p>
          <p>
            <strong>Reps: </strong> {workouts.reps}
          </p>
          <p>
            {formatDistanceToNow(new Date(workouts.createdAt), {
              addSuffix: true,
            })}
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span
              onClick={() => setEditMode(true)}
              style={{ cursor: "pointer" }}
              className="material-symbols-outlined"
            >
              update
            </span>
            <span
              onClick={() => handleDelete(workouts._id)}
              style={{ marginTop: "70px", cursor: "pointer" }}
              className="material-symbols-outlined"
            >
              Delete
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
