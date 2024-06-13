import mongoose from "mongoose";

const coachSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    specialties: [{ type: String }],
    photo: {
      type: String,
      default:
        "https://play-lh.googleusercontent.com/7FIQAzj4Zcr-4PfQwE8c5_DBU232r4jn5tMjeEMNKQ6CoVAIFxTnYX_bqc6tS8_b1eA",
    },
  },
  { timestamps: true }
);

const Coach = mongoose.model("Coach", coachSchema);

export default Coach;
