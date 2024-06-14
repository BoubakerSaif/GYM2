import asyncHandler from "express-async-handler";
import Coach from "../Model/coachModel.js";
import cloudinary from "../Utils/cloudinary.js";

const createCoach = asyncHandler(async (req, res) => {
  const { firstName, lastName, age, gender, specialties } = req.body;
  try {
    const coach = await Coach.create({
      firstName,
      lastName,
      age,
      specialties,
      gender,
    });
    res.status(201).json(coach);
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

const getAllCoachs = asyncHandler(async (req, res) => {
  try {
    const coachs = await Coach.find();
    res.status(200).json(coachs);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const getSingleCoach = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await Coach.findById(id);
    res.status(200).json(coach);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const updateCoach = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, gender, specialties } = req.body;
  try {
    const coach = await Coach.findById(id);
    if (coach) {
      coach.firstName = firstName || coach.firstName;
      coach.lastName = lastName || coach.lastName;
      coach.age = age || coach.age;
      coach.gender = gender || coach.gender;
      coach.specialties = specialties || coach.specialties;
      const updatedCoach = await coach.save();
      res.status(200).json(updatedCoach);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const deleteCoach = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await Coach.findByIdAndDelete(id);
    res.status(200).json(coach);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const updatePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params;
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
    const coach = await Coach.findById(id);
    coach.photo = result.url || coach.photo;
    const updatedCoach = await coach.save();

    res.status(200).json({
      success: true,
      message: "Uploaded",
      updatedCoach,
    });
  });
});

export {
  createCoach,
  getAllCoachs,
  getSingleCoach,
  updateCoach,
  deleteCoach,
  updatePhoto,
};
