import express from "express";
import {
  createWorkout,
  getIdwork,
  getallworks,
  DeleteWorkout,
  updatework,
} from "../controllers/workoutControllers.js";
const router = express.Router();

// Get all workouts
router.get("/workouts", getallworks);

// Get a workout by ID
router.get("/workouts/:id", getIdwork);

// Create a new workout
router.post("/workouts", createWorkout);

// Delete a workout
router.delete("/workouts/:id", DeleteWorkout);

// Update a workout
router.patch("/workouts/:id", updatework);

export default router;
