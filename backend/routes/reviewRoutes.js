import express from "express";
import {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Public routes
router.get("/:portfolioId", getReviews);
router.post("/:portfolioId", addReview);

// Update and delete routes
router.patch("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);

export default router;
