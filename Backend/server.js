import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./Routers/Router.js";
import { UserRouter } from "./Routers/UsersRouter.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/workouts", router);
app.use("/api/user", UserRouter);

// Serve static files from frontend build folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => console.error(err));
