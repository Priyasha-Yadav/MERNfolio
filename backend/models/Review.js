import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: "Portfolio", required: true },
    reviewerName: { type: String, required: true },
    reviewerProfile: { type: String }, // Cloudinary URL
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true }, // Rating between 1 and 5 stars
  },
  { timestamps: true }
);

// Explicitly setting the collection name to "Reviews"
const Review = mongoose.model("Review", reviewSchema, "Reviews");
export default Review;
