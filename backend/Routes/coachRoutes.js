import express from "express";
upload;
import { protect } from "../Middlewares/authMiddleware.js";
import {
  createCoach,
  deleteCoach,
  getAllCoachs,
  getSingleCoach,
  updateCoach,
} from "../Controllers/coachController.js";
import upload from "../Middlewares/multer.js";
const router = express.Router();

router.post("/", protect, upload.single("image"), createCoach);
router.get("/", getAllCoachs);
router.get("/coach/:id", getSingleCoach);
router.put("/coach/:id", upload.single("image"), updateCoach);
router.delete("/coach/:id", deleteCoach);

export default router;
