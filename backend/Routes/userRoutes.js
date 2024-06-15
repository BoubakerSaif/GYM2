import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  blockUnblockUser,
  chooseMembership,
  getAllUsers,
  updatePhoto,
} from "../Controllers/userController.js";
import { protect } from "../Middlewares/authMiddleware.js";
import upload from "../Middlewares/multer.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.get("/", protect, getAllUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put("/block/:id", protect, blockUnblockUser);
router.put("/membership", protect, chooseMembership);
router.put(
  "/profile/updatephoto",
  protect,
  upload.single("image"),
  updatePhoto
);

export default router;
