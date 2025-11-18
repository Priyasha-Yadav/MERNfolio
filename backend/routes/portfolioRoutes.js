import express from "express";
import {
  getPortfolio,
  createOrUpdatePortfolio,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  addExperience,
  updateExperience,
  deleteExperience,
  fetchGitHubProjects,
  updateTheme,
  deletePortfolio,
  submitContactForm,
  updateContactInfo,
} from "../controllers/portfolioController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - IMPORTANT: Specific routes must come before dynamic routes
router.get("/github/:username", fetchGitHubProjects);
router.post("/:userId/contact", submitContactForm);
router.get("/:userId", getPortfolio);

// Protected routes (require authentication)
router.post("/:userId", verifyToken, createOrUpdatePortfolio);
router.post("/:userId/skills", verifyToken, addSkill);
router.put("/:userId/skills/:skillIndex", verifyToken, updateSkill);
router.delete("/:userId/skills/:skillIndex", verifyToken, deleteSkill);
router.post("/:userId/projects", verifyToken, addProject);
router.put("/:userId/projects/:projectIndex", verifyToken, updateProject);
router.delete("/:userId/projects/:projectIndex", verifyToken, deleteProject);
router.post("/:userId/experience", verifyToken, addExperience);
router.put("/:userId/experience/:experienceIndex", verifyToken, updateExperience);
router.delete("/:userId/experience/:experienceIndex", verifyToken, deleteExperience);
router.patch("/:userId/theme", verifyToken, updateTheme);
router.put("/:userId/contact", verifyToken, updateContactInfo);
router.delete("/:userId", verifyToken, deletePortfolio);

export default router;
