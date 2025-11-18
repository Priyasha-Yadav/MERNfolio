import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  updateProfile: (uid, data) => api.put(`/auth/profile/${uid}`, data),
};

// Portfolio API
export const portfolioAPI = {
  getPortfolio: (userId) => api.get(`/portfolio/${userId}`),
  createOrUpdatePortfolio: (userId, data) => api.post(`/portfolio/${userId}`, data),
  addSkill: (userId, data) => api.post(`/portfolio/${userId}/skills`, data),
  updateSkill: (userId, skillIndex, data) => api.put(`/portfolio/${userId}/skills/${skillIndex}`, data),
  deleteSkill: (userId, skillIndex) => api.delete(`/portfolio/${userId}/skills/${skillIndex}`),
  addProject: (userId, data) => api.post(`/portfolio/${userId}/projects`, data),
  updateProject: (userId, projectIndex, data) => api.put(`/portfolio/${userId}/projects/${projectIndex}`, data),
  deleteProject: (userId, projectIndex) => api.delete(`/portfolio/${userId}/projects/${projectIndex}`),
  addExperience: (userId, data) => api.post(`/portfolio/${userId}/experience`, data),
  updateExperience: (userId, experienceIndex, data) => api.put(`/portfolio/${userId}/experience/${experienceIndex}`, data),
  deleteExperience: (userId, experienceIndex) => api.delete(`/portfolio/${userId}/experience/${experienceIndex}`),
  updateTheme: (userId, theme) => api.patch(`/portfolio/${userId}/theme`, { theme }),
  updateContactInfo: (userId, data) => api.put(`/portfolio/${userId}/contact`, data),
  submitContactForm: (userId, data) => api.post(`/portfolio/${userId}/contact`, data),
  deletePortfolio: (userId) => api.delete(`/portfolio/${userId}`),
  fetchGitHubProjects: (username) => api.get(`/portfolio/github/${username}`),
};

// Review API
export const reviewAPI = {
  getReviews: (portfolioId) => api.get(`/reviews/${portfolioId}`),
  addReview: (portfolioId, data) => api.post(`/reviews/${portfolioId}`, data),
  updateReview: (reviewId, data) => api.patch(`/reviews/${reviewId}`, data),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),
};

export default api;
