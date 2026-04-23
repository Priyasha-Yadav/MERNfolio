# MERNfolio Frontend

This is the frontend for the MERNfolio application, a full-stack platform for creating and managing personal portfolios. It is built with React and Vite, offering a fast and modern development experience.

## Features

-   **Dynamic Portfolio Display:** Fetches and displays portfolio data from the backend.
-   **User Authentication:** Login and registration functionality.
-   **Interactive UI:** Smooth and responsive user interface with gamified elements.
-   **Theme Switching:** Light and dark mode support.
-   **Toast Notifications:** For user feedback on actions.
-   **Protected Routes:** Certain routes are only accessible to authenticated users.
-   **Modular Components:** A well-organized component structure for easy maintenance.

## Technologies Used

-   **React:** A JavaScript library for building user interfaces.
-   **Vite:** A fast build tool and development server.
-   **React Router:** For client-side routing.
-   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
-   **Axios:** For making HTTP requests to the backend API.
-   **ESLint:** For code linting and quality checks.

## Project Structure

```
frontend/
│── public/                 # Static assets
│── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable React components
│   ├── context/            # React context for state management (Auth, Theme)
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Top-level page components
│   ├── utils/              # Utility functions and API helpers
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point of the application
│   └── index.css           # Global styles
│── .eslintrc.cjs           # ESLint configuration
│── tailwind.config.js      # Tailwind CSS configuration
│── vite.config.js          # Vite configuration
│── package.json            # Dependencies & scripts
└── README.md               # Documentation
```

## Prerequisites

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [npm](https://www.npmjs.com/)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mernfolio.git
    cd mernfolio/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the `frontend` directory and add the following environment variable to connect to the backend API:

```
VITE_API_URL=http://localhost:5000/api
```

## Usage

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run lint`: Lints the code using ESLint.
-   `npm run preview`: Serves the production build locally for preview.

---


