import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { portfolioAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import FormField from '../components/FormField';
import { useToast } from '../hooks/useToast';

const DashboardEnhanced = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, removeToast, showSuccess, showError } = useToast();
  
  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  
  // Form states
  const [about, setAbout] = useState('');
  const [skill, setSkill] = useState({ name: '', level: 50 });
  const [editingSkill, setEditingSkill] = useState(null);
  const [project, setProject] = useState({ title: '', description: '', repoLink: '', liveDemo: '', image: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [experience, setExperience] = useState({ title: '', company: '', duration: '', description: '' });
  const [editingExperience, setEditingExperience] = useState(null);
  const [githubUsername, setGithubUsername] = useState('');

  // Form validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      loadPortfolio();
    }
  }, [user]);

  const loadPortfolio = async () => {
    try {
      const response = await portfolioAPI.getPortfolio(user.uid);
      setPortfolio(response.data);
      setAbout(response.data.about || '');
    } catch (error) {
      if (error.response?.status === 404) {
        console.log('Portfolio not found - will be created when adding content');
        setPortfolio(null);
      } else {
        console.error('Error loading portfolio:', error);
        showError('Failed to load portfolio. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Validation functions
  const validateAbout = () => {
    const newErrors = {};
    if (!about.trim()) {
      newErrors.about = 'About section cannot be empty';
    } else if (about.length < 10) {
      newErrors.about = 'About section should be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSkill = () => {
    const newErrors = {};
    if (!skill.name.trim()) {
      newErrors.skillName = 'Skill name is required';
    }
    if (skill.level < 0 || skill.level > 100) {
      newErrors.skillLevel = 'Skill level must be between 0 and 100';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProject = () => {
    const newErrors = {};
    if (!project.title.trim()) {
      newErrors.projectTitle = 'Project title is required';
    }
    if (!project.description.trim()) {
      newErrors.projectDescription = 'Project description is required';
    }
    if (project.repoLink && !isValidUrl(project.repoLink)) {
      newErrors.projectRepoLink = 'Invalid repository URL';
    }
    if (project.liveDemo && !isValidUrl(project.liveDemo)) {
      newErrors.projectLiveDemo = 'Invalid demo URL';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateExperience = () => {
    const newErrors = {};
    if (!experience.title.trim()) {
      newErrors.experienceTitle = 'Job title is required';
    }
    if (!experience.company.trim()) {
      newErrors.experienceCompany = 'Company name is required';
    }
    if (!experience.duration.trim()) {
      newErrors.experienceDuration = 'Duration is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handler functions with validation and error handling
  const handleUpdateAbout = async () => {
    if (!validateAbout()) return;
    
    setIsSubmitting(true);
    try {
      await portfolioAPI.createOrUpdatePortfolio(user.uid, { about });
      showSuccess('About section updated successfully!');
      loadPortfolio();
    } catch (error) {
      console.error('Error updating about:', error);
      showError('Failed to update about section. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSkill = async () => {
    if (!validateSkill()) return;
    
    setIsSubmitting(true);
    try {
      await portfolioAPI.addSkill(user.uid, skill);
      showSuccess('Skill added successfully!');
      setSkill({ name: '', level: 50 });
      setErrors({});
      loadPortfolio();
    } catch (error) {
      console.error('Error adding skill:', error);
      showError('Failed to add skill. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSkill = (index, skillData) => {
    setEditingSkill(index);
    setSkill({ name: skillData.name, level: skillData.level });
    setErrors({});
  };

  const handleUpdateSkill = async () => {
    if (!validateSkill()) return;
    
    setIsSubmitting(true);
    try {
      await portfolioAPI.updateSkill(user.uid, editingSkill, skill);
      showSuccess('Skill updated successfully!');
      setSkill({ name: '', level: 50 });
      setEditingSkill(null);
      setErrors({});
      loadPortfolio();
    } catch (error) {
      console.error('Error updating skill:', error);
      showError('Failed to update skill. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSkill = async (index) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Skill',
      message: 'Are you sure you want to delete this skill? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await portfolioAPI.deleteSkill(user.uid, index);
          showSuccess('Skill deleted successfully!');
          loadPortfolio();
        } catch (error) {
          console.error('Error deleting skill:', error);
          showError('Failed to delete skill. Please try again.');
        }
      },
    });
  };

  const handleAddProject = async () => {
    if (!validateProject()) return;
    
    setIsSubmitting(true);
    try {
      await portfolioAPI.addProject(user.uid, project);
      showSuccess('Project added successfully!');
      setProject({ title: '', description: '', repoLink: '', liveDemo: '', image: '' });
      setErrors({});
      loadPortfolio();
    } catch (error) {
      console.error('Error adding project:', error);
      showError('Failed to add project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProject = (index, projectData) => {
    setEditingProject(index);
    setProject({
      title: projectData.title,
      description: projectData.description,
      repoLink: projectData.repoLink,
      liveDemo: projectData.liveDemo,
      image: projectData.image
    });
    setErrors({});
  };

  const handleUpdateProject = async () => {
    if (!validateProject()) return;
    
    setIsSubmitting(true);
    try {
      await portfolioAPI.updateProject(user.uid, editingProject, project);
      showSuccess('Project updated successfully!');
      setProject({ title: '', description: '', repoLink: '', liveDemo: '', image: '' });
      setEditingProject(null);
      setErrors({});
      loadPortfolio();
    } catch (error) {
      console.error('Error updating project:', error);
      showError('Failed to update project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = async (index) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Project',
      message: 'Are you sure you want to delete this project? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await portfolioAPI.deleteProject(user.uid, index);
          showSuccess('Project deleted successfully!');
          loadPortfolio();
        } catch (error) {
          console.error('Error deleting project:', error);
          showError('Failed to delete project. Please try again.');
        }
      },
    });
  };

  const handleAddExperience = async () => {
    if (!validateExperience()) return;
    
    setIsSubmitting(true);
    try {
      await portfolioAPI.addExperience(user.uid, experience);
      showSuccess('Experience added successfully!');
      setExperience({ title: '', company: '', duration: '', description: '' });
      setErrors({});
      loadPortfolio();
    } catch (error) {
      console.error('Error adding experience:', error);
      showError('Failed to add experience. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditExperience = (index, expData) => {
    setEditingExperience(index);
    setExperience({
      title: expData.title,
      company: expData.company,
      duration: expData.duration,
      description: expData.description
    });
    setErrors({});
  };

  const handleUpdateExperience = async () => {
    if (!validateExperience()) return;
    
    setIsSubmitting(true);
    try {
      await portfolioAPI.updateExperience(user.uid, editingExperience, experience);
      showSuccess('Experience updated successfully!');
      setExperience({ title: '', company: '', duration: '', description: '' });
      setEditingExperience(null);
      setErrors({});
      loadPortfolio();
    } catch (error) {
      console.error('Error updating experience:', error);
      showError('Failed to update experience. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExperience = async (index) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Experience',
      message: 'Are you sure you want to delete this experience? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await portfolioAPI.deleteExperience(user.uid, index);
          showSuccess('Experience deleted successfully!');
          loadPortfolio();
        } catch (error) {
          console.error('Error deleting experience:', error);
          showError('Failed to delete experience. Please try again.');
        }
      },
    });
  };

  const handleFetchGitHub = async () => {
    if (!githubUsername.trim()) {
      showError('Please enter a GitHub username');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await portfolioAPI.fetchGitHubProjects(githubUsername);
      const projects = response.data;
      
      if (projects.length === 0) {
        showError('No public repositories found for this user');
        setIsSubmitting(false);
        return;
      }
      
      for (const proj of projects.slice(0, 5)) {
        await portfolioAPI.addProject(user.uid, proj);
      }
      
      showSuccess(`Added ${Math.min(projects.length, 5)} projects from GitHub!`);
      setGithubUsername('');
      loadPortfolio();
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      showError('Failed to fetch GitHub projects. Please check the username and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Toast Notifications */}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fadeIn">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold animate-slideInLeft">Dashboard</h1>
          <button 
            onClick={() => navigate(`/portfolio/${user.uid}`)}
            className="btn-primary w-full sm:w-auto"
            aria-label="View your portfolio"
          >
            View Portfolio
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto" role="tablist">
          {['about', 'skills', 'projects', 'experience', 'github'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setErrors({});
              }}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`${tab}-panel`}
              className={`tab-button whitespace-nowrap ${
                activeTab === tab
                  ? 'tab-button-active'
                  : 'tab-button-inactive'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="card animate-slideInUp" role="tabpanel" id="about-panel">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <FormField
              label="About"
              name="about"
              type="textarea"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              error={errors.about}
              touched={true}
              placeholder="Write about yourself... (minimum 10 characters)"
              rows={6}
            />
            <button 
              onClick={handleUpdateAbout} 
              className="btn-primary mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save About'}
            </button>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="card animate-slideInUp" role="tabpanel" id="skills-panel">
            <h2 className="text-2xl font-bold mb-4">{editingSkill !== null ? 'Edit Skill' : 'Add Skill'}</h2>
            <FormField
              label="Skill Name"
              name="skillName"
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              error={errors.skillName}
              touched={true}
              placeholder="e.g., React, Python, UI Design"
              required
            />
            <FormField
              label="Skill Level"
              name="skillLevel"
              type="range"
              value={skill.level}
              onChange={(e) => setSkill({ ...skill, level: parseInt(e.target.value) })}
              min={0}
              max={100}
              step={5}
            />
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={editingSkill !== null ? handleUpdateSkill : handleAddSkill} 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : editingSkill !== null ? 'Update Skill' : 'Add Skill'}
              </button>
              {editingSkill !== null && (
                <button
                  onClick={() => {
                    setEditingSkill(null);
                    setSkill({ name: '', level: 50 });
                    setErrors({});
                  }}
                  className="btn-ghost"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Current Skills</h3>
              {portfolio?.skills?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.skills.map((s, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover-lift transition-all">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-lg">{s.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSkill(index, s)}
                            className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium focus-visible-ring"
                            aria-label={`Edit ${s.name} skill`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(index)}
                            className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm font-medium focus-visible-ring"
                            aria-label={`Delete ${s.name} skill`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Level: {s.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${s.level}%` }}
                          role="progressbar"
                          aria-valuenow={s.level}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No skills added yet. Add your first skill above!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="card animate-slideInUp" role="tabpanel" id="projects-panel">
            <h2 className="text-2xl font-bold mb-4">{editingProject !== null ? 'Edit Project' : 'Add Project'}</h2>
            <FormField
              label="Project Title"
              name="projectTitle"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              error={errors.projectTitle}
              touched={true}
              placeholder="e.g., E-commerce Website"
              required
            />
            <FormField
              label="Description"
              name="projectDescription"
              type="textarea"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              error={errors.projectDescription}
              touched={true}
              placeholder="Describe your project..."
              rows={4}
              required
            />
            <FormField
              label="Repository Link"
              name="projectRepoLink"
              type="url"
              value={project.repoLink}
              onChange={(e) => setProject({ ...project, repoLink: e.target.value })}
              error={errors.projectRepoLink}
              touched={true}
              placeholder="https://github.com/username/repo"
            />
            <FormField
              label="Live Demo Link"
              name="projectLiveDemo"
              type="url"
              value={project.liveDemo}
              onChange={(e) => setProject({ ...project, liveDemo: e.target.value })}
              error={errors.projectLiveDemo}
              touched={true}
              placeholder="https://your-project.com (optional)"
            />
            <FormField
              label="Image URL"
              name="projectImage"
              type="url"
              value={project.image}
              onChange={(e) => setProject({ ...project, image: e.target.value })}
              placeholder="https://example.com/image.jpg (optional)"
            />
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={editingProject !== null ? handleUpdateProject : handleAddProject} 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : editingProject !== null ? 'Update Project' : 'Add Project'}
              </button>
              {editingProject !== null && (
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setProject({ title: '', description: '', repoLink: '', liveDemo: '', image: '' });
                    setErrors({});
                  }}
                  className="btn-ghost"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Current Projects</h3>
              {portfolio?.projects?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolio.projects.map((p, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover-lift transition-all">
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                      )}
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-lg">{p.title}</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditProject(index, p)}
                            className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium focus-visible-ring"
                            aria-label={`Edit ${p.title} project`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(index)}
                            className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm font-medium focus-visible-ring"
                            aria-label={`Delete ${p.title} project`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{p.description}</p>
                      <div className="flex gap-4 text-sm flex-wrap">
                        {p.repoLink && (
                          <a 
                            href={p.repoLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline focus-visible-ring"
                          >
                            GitHub →
                          </a>
                        )}
                        {p.liveDemo && (
                          <a 
                            href={p.liveDemo} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-purple-600 hover:underline focus-visible-ring"
                          >
                            Live Demo →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No projects added yet. Add your first project above!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="card animate-slideInUp" role="tabpanel" id="experience-panel">
            <h2 className="text-2xl font-bold mb-4">{editingExperience !== null ? 'Edit Experience' : 'Add Experience'}</h2>
            <FormField
              label="Job Title"
              name="experienceTitle"
              value={experience.title}
              onChange={(e) => setExperience({ ...experience, title: e.target.value })}
              error={errors.experienceTitle}
              touched={true}
              placeholder="e.g., Senior Frontend Developer"
              required
            />
            <FormField
              label="Company Name"
              name="experienceCompany"
              value={experience.company}
              onChange={(e) => setExperience({ ...experience, company: e.target.value })}
              error={errors.experienceCompany}
              touched={true}
              placeholder="e.g., Tech Corp Inc."
              required
            />
            <FormField
              label="Duration"
              name="experienceDuration"
              value={experience.duration}
              onChange={(e) => setExperience({ ...experience, duration: e.target.value })}
              error={errors.experienceDuration}
              touched={true}
              placeholder="e.g., Jan 2020 - Dec 2021"
              required
            />
            <FormField
              label="Description"
              name="experienceDescription"
              type="textarea"
              value={experience.description}
              onChange={(e) => setExperience({ ...experience, description: e.target.value })}
              placeholder="Describe your role and achievements..."
              rows={4}
            />
            <div className="flex gap-2 flex-wrap">
              <button 
                onClick={editingExperience !== null ? handleUpdateExperience : handleAddExperience} 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : editingExperience !== null ? 'Update Experience' : 'Add Experience'}
              </button>
              {editingExperience !== null && (
                <button
                  onClick={() => {
                    setEditingExperience(null);
                    setExperience({ title: '', company: '', duration: '', description: '' });
                    setErrors({});
                  }}
                  className="btn-ghost"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Work Experience</h3>
              {portfolio?.experience?.length > 0 ? (
                <div className="space-y-4">
                  {portfolio.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-600 bg-white dark:bg-gray-800 rounded-lg p-4 hover-lift transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-lg">{exp.title}</h4>
                          <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{exp.duration}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditExperience(index, exp)}
                            className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium focus-visible-ring"
                            aria-label={`Edit ${exp.title} experience`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(index)}
                            className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm font-medium focus-visible-ring"
                            aria-label={`Delete ${exp.title} experience`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No experience added yet. Add your first experience above!
                </p>
              )}
            </div>
          </div>
        )}

        {/* GitHub Tab */}
        {activeTab === 'github' && (
          <div className="card animate-slideInUp" role="tabpanel" id="github-panel">
            <h2 className="text-2xl font-bold mb-4">Import from GitHub</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Enter your GitHub username to automatically import your public repositories as projects (up to 5).
            </p>
            <FormField
              label="GitHub Username"
              name="githubUsername"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              placeholder="e.g., octocat"
            />
            <button 
              onClick={handleFetchGitHub} 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Fetching...' : 'Fetch GitHub Projects'}
            </button>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">💡 Tip</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This will import up to 5 of your most recent public repositories. You can edit or delete them afterwards.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardEnhanced;