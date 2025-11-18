import express from "express";
import { registerUser, loginUser, updateUserProfile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);  // Register a new user
router.post("/login", loginUser);        // Login existing user
router.put("/profile/:uid", verifyToken, updateUserProfile);  // Update user profile

export default router;
