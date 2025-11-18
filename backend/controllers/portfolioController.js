import Portfolio from "../models/Portfolio.js";
import User from "../models/User.js";
import axios from "axios";

// Get portfolio by user ID
export const getPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await Portfolio.findOne({ userId }).populate("friendsReviews");

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create or update portfolio
export const createOrUpdatePortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    const { theme, about, skills, projects, experience, contact } = req.body;

    let portfolio = await Portfolio.findOne({ userId });

    if (portfolio) {
      // Update existing portfolio
      portfolio.theme = theme || portfolio.theme;
      portfolio.about = about || portfolio.about;
      portfolio.skills = skills || portfolio.skills;
      portfolio.projects = projects || portfolio.projects;
      portfolio.experience = experience || portfolio.experience;
      portfolio.contact = contact || portfolio.contact;
      await portfolio.save();
      res.status(200).json({ message: "Portfolio updated successfully", portfolio });
    } else {
      // Create new portfolio
      portfolio = new Portfolio({
        userId,
        theme: theme || "light",
        about: about || "",
        skills: skills || [],
        projects: projects || [],
        experience: experience || [],
        contact: contact || {},
      });
      await portfolio.save();
      res.status(201).json({ message: "Portfolio created successfully", portfolio });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a skill to portfolio
export const addSkill = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, level } = req.body;

    let portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      // Auto-create portfolio if it doesn't exist
      portfolio = new Portfolio({
        userId,
        theme: "light",
        about: "",
        skills: [],
        projects: [],
        experience: [],
      });
    }

    portfolio.skills.push({ name, level });
    await portfolio.save();

    res.status(200).json({ message: "Skill added successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a project to portfolio
export const addProject = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, repoLink, liveDemo, image, category, technologies, featured } = req.body;

    let portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      // Auto-create portfolio if it doesn't exist
      portfolio = new Portfolio({
        userId,
        theme: "light",
        about: "",
        skills: [],
        projects: [],
        experience: [],
        contact: {},
      });
    }

    portfolio.projects.push({ 
      title, 
      description, 
      repoLink, 
      liveDemo, 
      image, 
      category: category || 'web',
      technologies: technologies || [],
      featured: featured || false
    });
    await portfolio.save();

    res.status(200).json({ message: "Project added successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add experience to portfolio
export const addExperience = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, company, duration, description } = req.body;

    let portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      // Auto-create portfolio if it doesn't exist
      portfolio = new Portfolio({
        userId,
        theme: "light",
        about: "",
        skills: [],
        projects: [],
        experience: [],
      });
    }

    portfolio.experience.push({ title, company, duration, description });
    await portfolio.save();

    res.status(200).json({ message: "Experience added successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch GitHub projects
export const fetchGitHubProjects = async (req, res) => {
  try {
    const { username } = req.params;

    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    const repos = response.data.map((repo) => {
      // Use OpenGraph image if available, otherwise use a placeholder based on language
      let imageUrl = `https://opengraph.githubassets.com/1/${username}/${repo.name}`;
      
      // Alternative: Generate a simple placeholder based on primary language
      // const language = repo.language || 'Code';
      // imageUrl = `https://via.placeholder.com/400x200/6366f1/ffffff?text=${encodeURIComponent(language)}`;
      
      return {
        title: repo.name,
        description: repo.description || "No description available",
        repoLink: repo.html_url,
        liveDemo: repo.homepage || "",
        image: imageUrl,
      };
    });

    res.status(200).json(repos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching GitHub projects", error: error.message });
  }
};

// Update theme (dark/light mode)
export const updateTheme = async (req, res) => {
  try {
    const { userId } = req.params;
    const { theme } = req.body;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    portfolio.theme = theme;
    await portfolio.save();

    res.status(200).json({ message: "Theme updated successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { userId, skillIndex } = req.params;
    const { name, level } = req.body;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (skillIndex < 0 || skillIndex >= portfolio.skills.length) {
      return res.status(400).json({ message: "Invalid skill index" });
    }

    portfolio.skills[skillIndex] = { name, level };
    await portfolio.save();

    res.status(200).json({ message: "Skill updated successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const { userId, skillIndex } = req.params;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (skillIndex < 0 || skillIndex >= portfolio.skills.length) {
      return res.status(400).json({ message: "Invalid skill index" });
    }

    portfolio.skills.splice(skillIndex, 1);
    await portfolio.save();

    res.status(200).json({ message: "Skill deleted successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { userId, projectIndex } = req.params;
    const { title, description, repoLink, liveDemo, image, category, technologies, featured } = req.body;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (projectIndex < 0 || projectIndex >= portfolio.projects.length) {
      return res.status(400).json({ message: "Invalid project index" });
    }

    portfolio.projects[projectIndex] = { 
      title, 
      description, 
      repoLink, 
      liveDemo, 
      image, 
      category: category || 'web',
      technologies: technologies || [],
      featured: featured || false
    };
    await portfolio.save();

    res.status(200).json({ message: "Project updated successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const { userId, projectIndex } = req.params;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (projectIndex < 0 || projectIndex >= portfolio.projects.length) {
      return res.status(400).json({ message: "Invalid project index" });
    }

    portfolio.projects.splice(projectIndex, 1);
    await portfolio.save();

    res.status(200).json({ message: "Project deleted successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const { userId, experienceIndex } = req.params;
    const { title, company, duration, description } = req.body;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (experienceIndex < 0 || experienceIndex >= portfolio.experience.length) {
      return res.status(400).json({ message: "Invalid experience index" });
    }

    portfolio.experience[experienceIndex] = { title, company, duration, description };
    await portfolio.save();

    res.status(200).json({ message: "Experience updated successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    const { userId, experienceIndex } = req.params;

    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    if (experienceIndex < 0 || experienceIndex >= portfolio.experience.length) {
      return res.status(400).json({ message: "Invalid experience index" });
    }

    portfolio.experience.splice(experienceIndex, 1);
    await portfolio.save();

    res.status(200).json({ message: "Experience deleted successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete portfolio
export const deletePortfolio = async (req, res) => {
  try {
    const { userId } = req.params;

    const portfolio = await Portfolio.findOneAndDelete({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Handle contact form submission
export const submitContactForm = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, subject, message } = req.body;

    console.log(`Contact form submission for user ${userId}:`, {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });
    
    res.status(200).json({ 
      message: "Contact form submitted successfully",
      success: true 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update contact information
export const updateContactInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const contactInfo = req.body;

    let portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    portfolio.contact = { ...portfolio.contact, ...contactInfo };
    await portfolio.save();

    res.status(200).json({ message: "Contact information updated successfully", portfolio });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
