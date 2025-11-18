import app from "./app.js";
import connectDB from "./config/db.js";
import "./config/firebase.js"; // Initializes Firebase

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected Successfully!");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1); // Stop if DB connection fails
  }
};

startServer();
