import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { portfolioAPI, reviewAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import GamifiedSkills from '../components/GamifiedSkills';
import Timeline from '../components/Timeline';
import ProfileSwitch from '../components/ProfileSwitch';
import BlogSection from '../components/BlogSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import FloatingActionButton from '../components/FloatingActionButton';

const PortfolioView = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ reviewerName: '', comment: '', rating: 5 });
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadPortfolio();
    loadBlogs();
  }, [userId]);

  const loadPortfolio = async () => {
    try {
      const portfolioRes = await portfolioAPI.getPortfolio(userId);
      setPortfolio(portfolioRes.data);
      
      if (portfolioRes.data._id) {
        const reviewsRes = await reviewAPI.getReviews(portfolioRes.data._id);
        setReviews(reviewsRes.data);
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBlogs = async () => {
    // Mock blog data - in real app, this would be an API call
    const mockBlogs = [
      {
        id: '1',
        title: 'My Journey into Full Stack Development',
        excerpt: 'How I transitioned from a different field into web development and the challenges I faced along the way.',
        content: 'Full content here...',
        tags: ['Career', 'Web Development', 'Learning'],
        readTime: 8,
        publishedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Building Scalable React Applications',
        excerpt: 'Best practices and patterns I\'ve learned for creating maintainable React applications.',
        content: 'Full content here...',
        tags: ['React', 'JavaScript', 'Best Practices'],
        readTime: 12,
        publishedAt: '2024-01-10T14:30:00Z'
      }
    ];
    setBlogs(mockBlogs);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await reviewAPI.addReview(portfolio._id, newReview);
      setNewReview({ reviewerName: '', comment: '', rating: 5 });
      setShowReviewForm(false);
      loadPortfolio();
      alert('Review submitted!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  const handleContactSubmit = async (contactData) => {
    try {
      await portfolioAPI.submitContactForm(userId, contactData);
      return Promise.resolve();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Portfolio Not Found</h2>
          <p>This user hasn't created a portfolio yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-bounce-in"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-bounce-in" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-bounce-in" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 animate-slideInDown">
            Welcome to My Portfolio 🚀
          </h1>
          <p className="text-2xl mb-8 animate-slideInUp" style={{animationDelay: '0.3s'}}>
            Showcasing my work, skills, and journey
          </p>
          <div className="flex justify-center gap-4 animate-fadeIn" style={{animationDelay: '0.6s'}}>
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Switch */}
        <div className="mb-8">
          <ProfileSwitch onProfileSelect={setSelectedProfile} />
        </div>
        {/* About Section */}
        {portfolio.about && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="card">
              <p className="text-lg leading-relaxed">{portfolio.about}</p>
            </div>
          </section>
        )}

        {/* Gamified Skills Section */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Skills & Expertise 🏆
            </h2>
            <GamifiedSkills skills={portfolio.skills} />
          </section>
        )}

        {/* Dynamic Projects Section */}
        {portfolio.projects && portfolio.projects.length > 0 && (
          <ProjectsSection 
            projects={portfolio.projects} 
            onViewProject={(projectId) => console.log('View project:', projectId)}
          />
        )}

        {/* Interactive Timeline */}
        {(portfolio.experience?.length > 0 || portfolio.education?.length > 0 || portfolio.certifications?.length > 0) && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              My Journey 📜
            </h2>
            <Timeline 
              experiences={portfolio.experience || []}
              education={portfolio.education || []}
              certifications={portfolio.certifications || []}
            />
          </section>
        )}

        {/* Blog Section */}
        <section className="mb-16">
          <BlogSection blogs={blogs} />
        </section>

        {/* Dynamic Contact Section */}
        <ContactSection 
          contactInfo={portfolio.contact || {}}
          onSubmitContact={handleContactSubmit}
        />

        {/* Reviews Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Reviews & Testimonials 💬</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-primary"
            >
              {showReviewForm ? 'Cancel' : 'Leave a Review'}
            </button>
          </div>

          {showReviewForm && (
            <div className="card mb-6">
              <form onSubmit={handleSubmitReview}>
                <input
                  type="text"
                  value={newReview.reviewerName}
                  onChange={(e) => setNewReview({ ...newReview, reviewerName: e.target.value })}
                  className="input mb-4"
                  placeholder="Your name"
                  required
                />
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="input mb-4"
                  placeholder="Your review..."
                  required
                />
                <div className="mb-4">
                  <label className="block mb-2">Rating: {newReview.rating} ⭐</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Submit Review
                </button>
              </form>
            </div>
          )}

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="card">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {review.reviewerName.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold">{review.reviewerName}</p>
                      <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No reviews yet. Be the first to leave one!
            </p>
          )}
        </section>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onScrollToProjects={() => scrollToSection('projects')}
        onScrollToContact={() => scrollToSection('contact')}
      />
    </div>
  );
};

export default PortfolioView;
