import mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchrma = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Workout", workoutSchrma);

export default Workout;
