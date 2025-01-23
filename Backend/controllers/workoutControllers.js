import { json } from "express";
import Workout from "../modules/workshoutModel.js";
import mongoose from "mongoose";
// get all workouts
const getallworks = async (req, res) => {
  const user_id = req.User;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  try {
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
// get a single workout
const getIdwork = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "the workout isn't found" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};
// create new workout
const createWorkout = async (req, res) => {
  const user_id = req.User;
  const { title, load, reps } = req.body;
  if (!title || !load || !reps) {
    return res.status(400).json({ err: "please fill all the fields" });
  }
  try {
    // Create a new workout
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Delete workout

const DeleteWorkout = async (req, res) => {
  const { id } = req.params;

  console.log("Deleting workout with ID:", id); // Log the ID for debugging

  // Validate the ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid workout ID format" });
  }

  try {
    // Attempt to delete the workout
    const workout = await Workout.findOneAndDelete({ _id: id });

    if (!workout) {
      return res
        .status(404)
        .json({ error: "Workout not found or already deleted" });
    }

    console.log("Deleted Workout:", workout); // Log the deleted workout
    res.status(200).json({ message: "Workout deleted successfully", workout });
  } catch (err) {
    console.error("Error while deleting workout:", err); // Log the error
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// update workout

const updatework = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "no such workout" });
  }
  const workout = await Workout.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  if (!workout) {
    return res
      .status(404)
      .json({ err: "there is an err with finding the workout" });
  }
  res.status(200).json(workout);
};

export { createWorkout, getallworks, getIdwork, DeleteWorkout, updatework };
