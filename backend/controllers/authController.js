import User from "../models/User.js";
import admin from "../config/firebase.js";

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Save user data to MongoDB
    const newUser = new User({
      uid: userRecord.uid,
      email,
      name,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Login logic using Firebase Auth (with email/password)
    const userRecord = await admin.auth().getUserByEmail(email);

    // You can implement Firebase email/password logic or another auth mechanism

    res.status(200).json({ message: "User logged in!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { uid } = req.params;
    const { name, profilePicture, socialLinks } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (profilePicture) user.profilePicture = profilePicture;
    if (socialLinks) user.socialLinks = socialLinks;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
