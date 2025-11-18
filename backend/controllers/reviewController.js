import Review from "../models/Review.js";
import Portfolio from "../models/Portfolio.js";

// Get all reviews for a portfolio
export const getReviews = async (req, res) => {
  try {
    const { portfolioId } = req.params;
    const reviews = await Review.find({ portfolioId }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { portfolioId } = req.params;
    const { reviewerName, reviewerProfile, comment, rating } = req.body;

    // Check if portfolio exists
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Create new review
    const newReview = new Review({
      portfolioId,
      reviewerName,
      reviewerProfile,
      comment,
      rating,
    });

    await newReview.save();

    // Add review reference to portfolio
    portfolio.friendsReviews.push(newReview._id);
    await portfolio.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { comment, rating } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.comment = comment || review.comment;
    review.rating = rating || review.rating;
    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Remove review reference from portfolio
    await Portfolio.findByIdAndUpdate(review.portfolioId, {
      $pull: { friendsReviews: reviewId },
    });

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
