import mongoose from "mongoose";

// Define the skill schema for XP-based progress
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, min: 0, max: 100, required: true },
});

// Define the project schema for showcasing GitHub repos, live demos, etc.
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  repoLink: { type: String },
  liveDemo: { type: String },
  image: { type: String }, // Cloudinary image URL
  category: { type: String, default: 'web' }, // web, mobile, desktop, etc.
  technologies: [{ type: String }], // Array of tech stack
  featured: { type: Boolean, default: false },
});

// Define the experience schema (work or education timeline)
const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String },
});

// Define contact information schema
const contactSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
  website: { type: String },
});

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Firebase UID (string)
    theme: { type: String, enum: ["dark", "light"], default: "light" },
    about: { type: String, default: "" },
    skills: [skillSchema],
    projects: [projectSchema],
    experience: [experienceSchema],
    contact: contactSchema,
    friendsReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

// Explicitly setting the collection name to "Portfolios"
const Portfolio = mongoose.model("Portfolio", portfolioSchema, "Portfolios");
export default Portfolio;
