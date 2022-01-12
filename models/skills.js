import mongoose from "mongoose";

const skillSchema = mongoose.Schema(
  {
    userID: String,
    skill: { type : String, required : true },
  }
);

export default mongoose.model("skills", skillSchema);