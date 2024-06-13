import express from "express";

import { protect } from "../Middlewares/authMiddleware.js";
import {
  createCoach,
  deleteCoach,
  getAllCoachs,
  getSingleCoach,
  updateCoach,
} from "../Controllers/coachController.js";
const router = express.Router();

router.post("/", protect, createCoach);
router.get("/", getAllCoachs);
router.get("/coach/:id", getSingleCoach);
router.put("/coach/:id", updateCoach);
router.delete("/coach/:id", deleteCoach);

export default router;
