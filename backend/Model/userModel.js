import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: String },
    gender: { type: String },
    phoneNumber: { type: String },
    weight: { type: String },
    height: { type: String },
    photo: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/017/764/451/small/universal-black-and-white-logo-with-the-image-of-a-sports-man-good-for-the-gym-vector.jpg",
    },
    password: { type: String, required: true },
    role: { type: String, default: "User" },
    blocked: { type: Boolean, default: false },
    membership: { type: String },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
