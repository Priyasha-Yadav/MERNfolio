backend/
│── config/                 # Configuration files (DB, Cloudinary, Firebase, etc.)
│   ├── db.js               # MongoDB connection
│   ├── cloudinary.js       # Cloudinary setup
│   ├── firebase.js         # Firebase admin SDK (if using Firebase Auth)
│── controllers/            # Business logic for routes
│   ├── authController.js   # Handles login, registration, logout
│   ├── userController.js   # Fetch & update user data
│   ├── portfolioController.js # Handles portfolio-related logic
│── models/                 # Mongoose schemas
│   ├── User.js             # User model
│   ├── Portfolio.js        # Portfolio model (projects, skills, etc.)
│   ├── Review.js           # Reviews
│── routes/                 # API endpoints
│   ├── authRoutes.js       # Auth-related routes
│   ├── userRoutes.js       # User-related routes
│   ├── portfolioRoutes.js  # Portfolio routes
│── middleware/             # Middleware functions
│   ├── authMiddleware.js   # Firebase token verification / JWT auth
│── utils/                  # Helper functions (email sending, etc.)
│   ├── errorHandler.js     # Error handling middleware
│── app.js                  # Express app setup
│── server.js               # Server entry point
│── .env                    # Environment variables
│── .gitignore              # Ignore sensitive files
│── package.json            # Dependencies & scripts
│── README.md               # Documentation
