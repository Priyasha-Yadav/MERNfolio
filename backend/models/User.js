import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema({
  github: { type: String, required: true },
  linkedin: { type: String },
  website: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePicture: { type: String }, // Cloudinary URL
    socialLinks: { type: socialLinksSchema },
  },
  { timestamps: true }
);

// Explicitly setting the collection name to "Users"
const User = mongoose.model("User", userSchema, "Users");
export default User;
