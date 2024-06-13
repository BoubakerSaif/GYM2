import asyncHandler from "express-async-handler";
import User from "../Model/userModel.js";
import generateToken from "../Utils/generateToken.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200);
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      weight: user.weight,
      age: user.age,
      gender: user.gender,
      height: user.height,
      role: user.role,
      blocked: user.blocked,
      photo: user.photo,
      membership: user.membership,
      phoneNumber: user.phoneNumber,
      courses: user.courses,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password ");
  }
});

// @desc Register new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    weight,
    height,
    password,
    phoneNumber,
    age,
    gender,
  } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    weight,
    height,
    password,
    phoneNumber,
    age,
    gender,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      weight: user.weight,
      height: user.height,
      role: user.role,
      blocked: user.blocked,
      photo: user.photo,
      membership: user.membership,
      phoneNumber: user.phoneNumber,
      courses: user.courses,
      age: user.age,
      gender: user.gender,
    });
  } else {
    throw new Error("Invalid User Data");
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("JWT", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged Out" });
});

// @desc get user Profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("courses");
    res.status(200).json(user);
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().populate("courses").select("-participants");
    res.status(200).json(users);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc Uopdate user Profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const {
    firstName,
    lastName,
    email,
    height,
    weight,
    photo,
    password,
    phoneNumber,
    age,
    gender,
    membership,
  } = req.body;
  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.weight = weight || user.weight;
    user.height = height || user.height;
    user.photo = photo || user.photo;
    user.password = password || user.password;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.membership = membership || user.membership;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error(" User not found");
  }
});

const blockUnblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    user.blocked = !user.blocked;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const chooseMembership = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { membership } = req.body;

  if (user) {
    user.membership = membership;
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  blockUnblockUser,
  chooseMembership,
  getAllUsers,
};
