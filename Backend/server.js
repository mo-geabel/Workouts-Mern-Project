import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./Routers/router.js";
import { UserRouter } from "./Routers/UsersRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  // Your middleware logic here
  console.log(`${req.method} ${req.url}`); // Logs the HTTP method and URL
  next(); // Passes control to the next middleware or route
});

app.use(express.urlencoded({ extended: true }));

app.use("/api/workouts", router);
app.use("/api/user", UserRouter);
mongoose
  .connect(process.env.URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Example app listening on http://localhost/${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
