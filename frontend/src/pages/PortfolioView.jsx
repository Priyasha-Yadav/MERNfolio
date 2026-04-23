import { Suspense, lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { portfolioAPI, reviewAPI } from '../utils/api';
import Navbar from '../components/Navbar';
import FloatingActionButton from '../components/FloatingActionButton';

const templateLoaders = {
  modern: lazy(() => import('../components/templates/ModernTemplate')),
  minimal: lazy(() => import('../components/templates/MinimalTemplate')),
  developer: lazy(() => import('../components/templates/DeveloperTemplate')),
};

const TemplateFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading portfolio template...</p>
    </div>
  </div>
);

const PortfolioView = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPortfolio(); }, [userId]);

  const loadPortfolio = async () => {
    try {
      const res = await portfolioAPI.getPortfolio(userId);
      setPortfolio(res.data);
      if (res.data._id) {
        const revRes = await reviewAPI.getReviews(res.data._id);
        setReviews(revRes.data);
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (contactData) => {
    await portfolioAPI.submitContactForm(userId, contactData);
  };

  const handleAddReview = async (reviewData) => {
    if (!portfolio?._id) return;
    const res = await reviewAPI.addReview(portfolio._id, reviewData);
    setReviews((prev) => [res.data.review, ...prev]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner" />
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Portfolio Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400">This user hasn't created a portfolio yet.</p>
        </div>
      </div>
    );
  }

  const contactInfo = {
    ...portfolio.contact,
    email: portfolio.contact?.email || (user?.uid === userId ? user?.email : '') || ''
  };

  const template = portfolio.template || 'modern';
  const showNavbar = template !== 'developer';

  const templateProps = { portfolio, contactInfo, onSubmitContact: handleContactSubmit, reviews, onAddReview: handleAddReview, portfolioId: portfolio._id };
  const Template = templateLoaders[template] || templateLoaders.modern;

  return (
    <div className={`min-h-screen ${template === 'developer' ? 'bg-gray-950' : 'bg-gray-50 dark:bg-gray-900'}`}>
      {showNavbar && <Navbar />}

      <Suspense fallback={<TemplateFallback />}>
        <Template {...templateProps} />
      </Suspense>

      {template !== 'developer' && (
        <FloatingActionButton
          onScrollToProjects={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          onScrollToContact={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        />
      )}
    </div>
  );
};

export default PortfolioView;
