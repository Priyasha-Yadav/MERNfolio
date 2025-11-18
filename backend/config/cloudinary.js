import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Make sure your environment variables are loaded

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("🌥️ Cloudinary Initialized Successfully!");

export default cloudinary;
