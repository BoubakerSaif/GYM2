import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    sportType: { type: String, required: true },
    planning: { type: String, required: true },
    date: {
      type: Date,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    numberOfParticipants: { type: Number, default: 0 },
    photo: {
      type: String,
      default:
        "https://hips.hearstapps.com/hmg-prod/images/pushups-royalty-free-image-1570214607.jpg",
    },
    trainedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coach",
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
