import express from "express";
upload;
import { protect } from "../Middlewares/authMiddleware.js";
import {
  createCoach,
  deleteCoach,
  getAllCoachs,
  getSingleCoach,
  updateCoach,
  updatePhoto,
} from "../Controllers/coachController.js";
import upload from "../Middlewares/multer.js";
const router = express.Router();

router.post("/", protect, createCoach);
router.get("/", getAllCoachs);
router.get("/coach/:id", getSingleCoach);
router.put("/coach/:id", updateCoach);
router.delete("/coach/:id", deleteCoach);
router.put("/coachimg/:id", upload.single("image"), updatePhoto);

export default router;
