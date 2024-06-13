import express from "express";
import dotenv from "dotenv";
import UserRoutes from "./Routes/userRoutes.js";
import { errorHandler, notFound } from "./Middlewares/errorMiddleware.js";
import ConnectDB from "./Config/db.js";
import cookieParser from "cookie-parser";
import CourseRoutes from "./Routes/courseRoutes.js";
import CoachRoutes from "./Routes/coachRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 4000;
ConnectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", UserRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/coachs", CoachRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
