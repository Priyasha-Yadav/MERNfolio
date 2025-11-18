import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Get the Firebase private key JSON file path from the .env file
const serviceAccountPath = path.resolve(process.env.FIREBASE_ADMIN_SDK_PATH);

// Check if the file exists before initializing Firebase
if (!fs.existsSync(serviceAccountPath)) {
  console.error("⚠️ Firebase private key JSON file is missing!");
  process.exit(1);
}

// Read the JSON file and parse it
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("🔥 Firebase Admin Initialized Successfully!");

export default admin;
