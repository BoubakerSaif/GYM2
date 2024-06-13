import express from "express";
import { protect } from "../Middlewares/authMiddleware.js";
import {
  createCourse,
  updateCourse,
  getAllCourses,
  deleteCourse,
  subscribeCourse,
  unSubscribeCourse,
  getSingleCourse,
} from "../Controllers/courseController.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.post("/", protect, createCourse);
router.put("/course/:id", protect, updateCourse);
router.delete("/course/:id", protect, deleteCourse);
router.put("/subcourse/:id", protect, subscribeCourse);
router.put("/unsubcourse/:id", protect, unSubscribeCourse);

export default router;
