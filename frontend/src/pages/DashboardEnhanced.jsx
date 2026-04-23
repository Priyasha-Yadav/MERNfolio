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
  const [education, setEducation] = useState({ degree: '', institution: '', duration: '', description: '' });
  const [editingEducation, setEditingEducation] = useState(null);
  const [certification, setCertification] = useState({ title: '', issuer: '', date: '', link: '' });
  const [editingCertification, setEditingCertification] = useState(null);
  const [githubUsername, setGithubUsername] = useState('');
  const [contactInfo, setContactInfo] = useState({
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    location: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

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
      if (response.data.contact) {
        setContactInfo({
          email: response.data.contact.email || user?.email || '',
          github: response.data.contact.github || '',
          linkedin: response.data.contact.linkedin || '',
          twitter: response.data.contact.twitter || '',
          website: response.data.contact.website || '',
          location: response.data.contact.location || ''
        });
      } else {
        setContactInfo(prev => ({ ...prev, email: user?.email || '' }));
      }
      setSelectedTemplate(response.data.template || 'modern');
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

  const handleSaveContact = async () => {
    setIsSubmitting(true);
    try {
      await portfolioAPI.updateContactInfo(user.uid, contactInfo);
      showSuccess('Contact information saved successfully!');
      loadPortfolio();
    } catch (error) {
      console.error('Error saving contact info:', error);
      showError('Failed to save contact information.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveTemplate = async (template) => {
    setSelectedTemplate(template);
    setIsSubmitting(true);
    try {
      await portfolioAPI.createOrUpdatePortfolio(user.uid, { template });
      showSuccess(`Template changed to ${template}!`);
      loadPortfolio();
    } catch (error) {
      console.error('Error saving template:', error);
      showError('Failed to save template.');
    } finally {
      setIsSubmitting(false);
    }
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
          {['about', 'contact', 'skills', 'projects', 'experience', 'education', 'certifications', 'template', 'github'].map((tab) => {
            const tabLabels = {
              about: 'About',
              contact: 'Contact & Social',
              skills: 'Skills',
              projects: 'Projects',
              experience: 'Experience',
              education: 'Education',
              certifications: 'Certificates',
              template: 'Template',
              github: 'GitHub'
            };
            return (
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
                {tabLabels[tab]}
              </button>
            );
          })}
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

        {/* Contact & Social Tab */}
        {activeTab === 'contact' && (
          <div className="card animate-slideInUp" role="tabpanel" id="contact-panel">
            <h2 className="text-2xl font-bold mb-2">Contact & Social Links</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              Add your contact details and social links so visitors can reach you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Email Address"
                name="contactEmail"
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="your@email.com"
              />
              <FormField
                label="Location"
                name="contactLocation"
                value={contactInfo.location}
                onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                placeholder="e.g., San Francisco, CA"
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 my-6 pt-6">
              <h3 className="text-lg font-semibold mb-4">Social Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </label>
                  <input
                    type="url"
                    value={contactInfo.github}
                    onChange={(e) => setContactInfo({ ...contactInfo, github: e.target.value })}
                    className="input"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={contactInfo.linkedin}
                    onChange={(e) => setContactInfo({ ...contactInfo, linkedin: e.target.value })}
                    className="input"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X (Twitter)
                  </label>
                  <input
                    type="url"
                    value={contactInfo.twitter}
                    onChange={(e) => setContactInfo({ ...contactInfo, twitter: e.target.value })}
                    className="input"
                    placeholder="https://x.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                    Personal Website
                  </label>
                  <input
                    type="url"
                    value={contactInfo.website}
                    onChange={(e) => setContactInfo({ ...contactInfo, website: e.target.value })}
                    className="input"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveContact}
              className="btn-primary mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Contact Info'}
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

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="card animate-slideInUp" role="tabpanel" id="education-panel">
            <h2 className="text-2xl font-bold mb-4">{editingEducation !== null ? 'Edit Education' : 'Add Education'}</h2>
            <FormField label="Degree / Course" name="eduDegree" value={education.degree} onChange={(e) => setEducation({ ...education, degree: e.target.value })} error={errors.eduDegree} touched={true} placeholder="e.g., B.Tech Computer Science" required />
            <FormField label="Institution" name="eduInstitution" value={education.institution} onChange={(e) => setEducation({ ...education, institution: e.target.value })} error={errors.eduInstitution} touched={true} placeholder="e.g., IIT Delhi" required />
            <FormField label="Duration" name="eduDuration" value={education.duration} onChange={(e) => setEducation({ ...education, duration: e.target.value })} error={errors.eduDuration} touched={true} placeholder="e.g., 2020 - 2024" required />
            <FormField label="Description (optional)" name="eduDescription" type="textarea" value={education.description} onChange={(e) => setEducation({ ...education, description: e.target.value })} placeholder="CGPA, achievements, relevant coursework..." rows={3} />
            <div className="flex gap-2 flex-wrap mt-4">
              <button onClick={async () => {
                if (!education.degree.trim() || !education.institution.trim() || !education.duration.trim()) { setErrors({ eduDegree: !education.degree.trim() ? 'Required' : '', eduInstitution: !education.institution.trim() ? 'Required' : '', eduDuration: !education.duration.trim() ? 'Required' : '' }); return; }
                setIsSubmitting(true);
                try {
                  if (editingEducation !== null) { await portfolioAPI.updateEducation(user.uid, editingEducation, education); showSuccess('Education updated!'); }
                  else { await portfolioAPI.addEducation(user.uid, education); showSuccess('Education added!'); }
                  setEducation({ degree: '', institution: '', duration: '', description: '' }); setEditingEducation(null); setErrors({}); loadPortfolio();
                } catch (e) { showError('Failed to save education.'); }
                finally { setIsSubmitting(false); }
              }} className="btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : editingEducation !== null ? 'Update Education' : 'Add Education'}</button>
              {editingEducation !== null && <button onClick={() => { setEditingEducation(null); setEducation({ degree: '', institution: '', duration: '', description: '' }); setErrors({}); }} className="btn-secondary">Cancel</button>}
            </div>

            <div className="mt-8 space-y-4">
              {portfolio?.education?.length > 0 ? portfolio.education.map((edu, i) => (
                <div key={i} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-sm text-violet-600 dark:text-violet-400">{edu.institution}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{edu.duration}</p>
                    {edu.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{edu.description}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setEditingEducation(i); setEducation({ degree: edu.degree, institution: edu.institution, duration: edu.duration, description: edu.description || '' }); }} className="text-blue-500 hover:text-blue-600 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                    </button>
                    <button onClick={() => { setConfirmDialog({ isOpen: true, title: 'Delete Education', message: 'Delete this education entry?', onConfirm: async () => { try { await portfolioAPI.deleteEducation(user.uid, i); showSuccess('Deleted!'); loadPortfolio(); } catch (e) { showError('Failed to delete.'); } } }); }} className="text-red-500 hover:text-red-600 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </div>
                </div>
              )) : <p className="text-gray-500 dark:text-gray-400 text-center py-8">No education added yet.</p>}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="card animate-slideInUp" role="tabpanel" id="certifications-panel">
            <h2 className="text-2xl font-bold mb-4">{editingCertification !== null ? 'Edit Certificate' : 'Add Certificate'}</h2>
            <FormField label="Certificate Title" name="certTitle" value={certification.title} onChange={(e) => setCertification({ ...certification, title: e.target.value })} error={errors.certTitle} touched={true} placeholder="e.g., AWS Solutions Architect" required />
            <FormField label="Issuing Organization" name="certIssuer" value={certification.issuer} onChange={(e) => setCertification({ ...certification, issuer: e.target.value })} error={errors.certIssuer} touched={true} placeholder="e.g., Amazon Web Services" required />
            <FormField label="Date" name="certDate" value={certification.date} onChange={(e) => setCertification({ ...certification, date: e.target.value })} placeholder="e.g., March 2024" />
            <FormField label="Credential Link (optional)" name="certLink" value={certification.link} onChange={(e) => setCertification({ ...certification, link: e.target.value })} placeholder="https://verify.cert.com/..." />
            <div className="flex gap-2 flex-wrap mt-4">
              <button onClick={async () => {
                if (!certification.title.trim() || !certification.issuer.trim()) { setErrors({ certTitle: !certification.title.trim() ? 'Required' : '', certIssuer: !certification.issuer.trim() ? 'Required' : '' }); return; }
                setIsSubmitting(true);
                try {
                  if (editingCertification !== null) { await portfolioAPI.updateCertification(user.uid, editingCertification, certification); showSuccess('Certificate updated!'); }
                  else { await portfolioAPI.addCertification(user.uid, certification); showSuccess('Certificate added!'); }
                  setCertification({ title: '', issuer: '', date: '', link: '' }); setEditingCertification(null); setErrors({}); loadPortfolio();
                } catch (e) { showError('Failed to save certificate.'); }
                finally { setIsSubmitting(false); }
              }} className="btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : editingCertification !== null ? 'Update Certificate' : 'Add Certificate'}</button>
              {editingCertification !== null && <button onClick={() => { setEditingCertification(null); setCertification({ title: '', issuer: '', date: '', link: '' }); setErrors({}); }} className="btn-secondary">Cancel</button>}
            </div>

            <div className="mt-8 space-y-4">
              {portfolio?.certifications?.length > 0 ? portfolio.certifications.map((cert, i) => (
                <div key={i} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                    <p className="text-sm text-violet-600 dark:text-violet-400">{cert.issuer}</p>
                    {cert.date && <p className="text-xs text-gray-500 dark:text-gray-400">{cert.date}</p>}
                    {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-1 inline-block">View Credential →</a>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setEditingCertification(i); setCertification({ title: cert.title, issuer: cert.issuer, date: cert.date || '', link: cert.link || '' }); }} className="text-blue-500 hover:text-blue-600 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg>
                    </button>
                    <button onClick={() => { setConfirmDialog({ isOpen: true, title: 'Delete Certificate', message: 'Delete this certificate?', onConfirm: async () => { try { await portfolioAPI.deleteCertification(user.uid, i); showSuccess('Deleted!'); loadPortfolio(); } catch (e) { showError('Failed to delete.'); } } }); }} className="text-red-500 hover:text-red-600 p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>
                  </div>
                </div>
              )) : <p className="text-gray-500 dark:text-gray-400 text-center py-8">No certificates added yet.</p>}
            </div>
          </div>
        )}

        {/* Template Tab */}
        {activeTab === 'template' && (
          <div className="card animate-slideInUp" role="tabpanel" id="template-panel">
            <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
              Select a layout for your public portfolio. Each template has a unique style and feel.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Modern Template */}
              <button
                onClick={() => handleSaveTemplate('modern')}
                className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left ${
                  selectedTemplate === 'modern'
                    ? 'border-violet-500 shadow-xl shadow-violet-500/20 ring-2 ring-violet-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 hover:shadow-lg'
                }`}
              >
                {selectedTemplate === 'modern' && (
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 bg-violet-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                )}
                {/* Mini Preview */}
                <div className="p-4 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 h-28 flex items-end">
                  <div className="text-white">
                    <div className="w-20 h-2 bg-white/80 rounded mb-1.5"></div>
                    <div className="w-32 h-1.5 bg-white/40 rounded"></div>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800">
                  <div className="flex gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30"></div>
                    <div className="flex-1">
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-700/50 rounded"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="h-10 rounded bg-gray-100 dark:bg-gray-700/50"></div>
                    <div className="h-10 rounded bg-gray-100 dark:bg-gray-700/50"></div>
                  </div>
                </div>
                <div className="px-4 pb-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white">Modern</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Gradient hero, card-based layout with animations</p>
                </div>
              </button>

              {/* Minimal Template */}
              <button
                onClick={() => handleSaveTemplate('minimal')}
                className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left ${
                  selectedTemplate === 'minimal'
                    ? 'border-violet-500 shadow-xl shadow-violet-500/20 ring-2 ring-violet-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 hover:shadow-lg'
                }`}
              >
                {selectedTemplate === 'minimal' && (
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 bg-violet-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                )}
                {/* Mini Preview */}
                <div className="p-4 bg-white dark:bg-gray-800 h-28 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-2"></div>
                    <div className="w-20 h-2 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-1"></div>
                    <div className="w-28 h-1.5 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-900">
                  <h3 className="font-bold text-gray-900 dark:text-white">Minimal</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Clean single-column, typography-focused design</p>
                </div>
              </button>

              {/* Developer Template */}
              <button
                onClick={() => handleSaveTemplate('developer')}
                className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left ${
                  selectedTemplate === 'developer'
                    ? 'border-violet-500 shadow-xl shadow-violet-500/20 ring-2 ring-violet-500/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 hover:shadow-lg'
                }`}
              >
                {selectedTemplate === 'developer' && (
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 bg-violet-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                )}
                {/* Mini Preview */}
                <div className="p-4 bg-gray-950 h-28 font-mono">
                  <div className="text-xs">
                    <span className="text-green-400">$ </span>
                    <span className="text-gray-400">cat </span>
                    <span className="text-cyan-400">about.md</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">---</div>
                  <div className="w-24 h-1.5 bg-green-400/30 rounded mt-1"></div>
                  <div className="w-32 h-1.5 bg-gray-700 rounded mt-1"></div>
                </div>
                <div className="p-4 bg-gray-900 border-t border-gray-800">
                  <div className="flex gap-2 mb-2">
                    <div className="px-2 py-0.5 bg-green-500/20 rounded text-[10px] text-green-400 font-mono">JS</div>
                    <div className="px-2 py-0.5 bg-blue-500/20 rounded text-[10px] text-blue-400 font-mono">PY</div>
                    <div className="px-2 py-0.5 bg-purple-500/20 rounded text-[10px] text-purple-400 font-mono">RS</div>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex-1 h-1.5 bg-green-500/30 rounded"></div>
                    <div className="flex-1 h-1.5 bg-blue-500/30 rounded"></div>
                    <div className="w-8 h-1.5 bg-purple-500/30 rounded"></div>
                  </div>
                </div>
                <div className="px-4 pb-4 bg-gray-900">
                  <h3 className="font-bold text-white">Developer</h3>
                  <p className="text-xs text-gray-400">Terminal-inspired, dark-mode first, code-focused</p>
                </div>
              </button>
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
              <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                Tip
              </h3>
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