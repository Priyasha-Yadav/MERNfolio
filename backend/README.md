# MERNfolio Backend

This is the backend for the MERNfolio application, a full-stack platform for creating and managing personal portfolios.

## Features

-   **Authentication:** Secure user registration and login using JWT and Firebase Admin.
-   **Portfolio Management:** CRUD operations for portfolio data, including projects, skills, and personal information.
-   **Image Uploads:** Integrated with Cloudinary for seamless image hosting and management.
-   **Reviews:** Users can leave reviews on portfolios.
-   **RESTful API:** A well-structured API for the frontend to consume.

## Technologies Used

-   **Node.js:** JavaScript runtime environment.
-   **Express:** Web framework for Node.js.
-   **MongoDB:** NoSQL database for storing application data.
-   **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
-   **Firebase Admin:** For user authentication.
-   **Cloudinary:** For image and video management.
-   **JWT (JSON Web Tokens):** For securing API endpoints.
-   **dotenv:** For managing environment variables.

## Project Structure

```
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
```

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [npm](https://www.npmjs.com/)
-   [MongoDB](https://www.mongodb.com/) (local or cloud-hosted)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mernfolio.git
    cd mernfolio/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_TYPE=your_firebase_type
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_CLIENT_ID=your_firebase_client_id
FIREBASE_AUTH_URI=your_firebase_auth_uri
FIREBASE_TOKEN_URI=your_firebase_token_uri
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=your_firebase_auth_provider_x509_cert_url
FIREBASE_CLIENT_X509_CERT_URL=your_firebase_client_x509_cert_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

You can get the Firebase credentials from your Firebase project settings. You can get the Cloudinary credentials from your Cloudinary dashboard.

## Usage

To start the development server, run:

```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Log in a user.
-   `GET /api/portfolio/:id`: Get a portfolio by ID.
-   `POST /api/portfolio`: Create a new portfolio.
-   `PUT /api/portfolio/:id`: Update a portfolio.
-   `DELETE /api/portfolio/:id`: Delete a portfolio.
-   `POST /api/reviews`: Add a review to a portfolio.
-   `GET /api/reviews/:portfolioId`: Get all reviews for a portfolio.

---

