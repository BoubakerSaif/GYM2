import asyncHandler from "express-async-handler";
import Course from "../Model/courseModel.js";
import User from "../Model/userModel.js";

const createCourse = asyncHandler(async (req, res) => {
  const { sportType, planning, trainedBy } = req.body;

  const course = await Course.create({
    sportType,
    planning,
    trainedBy,
  });

  if (course) {
    res.status(201).json(course);
  } else {
    res.staus(400);
    throw new Error("Smothing Went Wrong");
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  const { sportType, planning } = req.body;
  const { id } = req.params;
  const course = await Course.findById(id);
  if (course) {
    course.sportType = sportType || course.sportType;
    course.planning = planning || course.planning;

    const updatedCourse = await course.save();
    res.status(201).json(updatedCourse);
  } else {
    res.status(401);
    throw new Error(" Course can't be updated");
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("participants")
      .populate("trainedBy");
    res.status(200).json(courses);
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

const getSingleCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("participants")
      .populate("trainedBy");
    res.status(200).json(course);
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByIdAndDelete(id);
    res.status(201).json(course);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const subscribeCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    const user = await User.findById(req.user._id);

    if (course.participants.indexOf(req.user._id) == -1) {
      course.participants.push(req.user._id);
      course.numberOfParticipants++;
      user.courses.push(id);
      const updatedCourse = await course.save();
      await user.save();
      res.status(200).json(updatedCourse);
    } else {
      res
        .status(401)
        .json({ message: "You are already subscribed to this course" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const unSubscribeCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    const user = await User.findById(req.user._id);

    if (course.participants.indexOf(req.user._id) != -1) {
      course.participants.splice(course.participants.indexOf(req.user._id, 1));
      course.numberOfParticipants--;
      user.courses.splice(user.courses.indexOf(id), 1);
      const updatedCourse = await course.save();
      await user.save();
      res.status(200).json(updatedCourse);
    } else {
      res.status(401).json({ message: "You are already not subscribed" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

export {
  createCourse,
  updateCourse,
  getAllCourses,
  deleteCourse,
  subscribeCourse,
  unSubscribeCourse,
  getSingleCourse,
};
