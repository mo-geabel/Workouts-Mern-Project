import express from "express";
import {
  createWorkout,
  getIdwork,
  getallworks,
  DeleteWorkout,
  updatework,
} from "../controllers/workoutControllers.js";
import { protect } from "../Middleware/Tokenmiddleware.js";
const router = express.Router();
// get auth

router.use(protect);
// Get all workouts
router.get("/", getallworks);

// Get a workout by ID
router.get("/:id", getIdwork);

// Create a new workout
router.post("/", createWorkout);

// Delete a workout
router.delete("/:id", DeleteWorkout);

// Update a workout
router.patch("/:id", updatework);

export default router;
