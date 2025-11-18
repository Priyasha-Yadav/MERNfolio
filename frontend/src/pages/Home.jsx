import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-pink-200 dark:bg-pink-800 rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-slideInDown">
            MERNfolio 🚀
          </h1>
          <p className="text-3xl text-gray-700 dark:text-gray-300 mb-8 animate-slideInUp" style={{animationDelay: '0.3s'}}>
            Build Your Professional Portfolio
          </p>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto animate-fadeIn" style={{animationDelay: '0.6s'}}>
            Create stunning portfolios with gamified skills, interactive timelines, multiple themes, and seamless GitHub integration.
          </p>

          <div className="flex gap-6 justify-center mb-16 animate-bounceIn" style={{animationDelay: '0.9s'}}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                  Dashboard 📊
                </Link>
                <Link to={`/portfolio/${user.uid}`} className="btn-secondary text-lg px-8 py-4">
                  My Portfolio 👤
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary text-lg px-8 py-4">
                  Get Started ✨
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Sign In 🔑
                </Link>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover-lift animate-slideInLeft" style={{animationDelay: '1.2s'}}>
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-3">Multiple Themes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ocean, Sunset, Forest themes with dark mode
              </p>
            </div>
            <div className="card hover-lift animate-slideInUp" style={{animationDelay: '1.4s'}}>
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Gamified Skills</h3>
              <p className="text-gray-600 dark:text-gray-400">
                XP system with levels and achievement badges
              </p>
            </div>
            <div className="card hover-lift animate-slideInRight" style={{animationDelay: '1.6s'}}>
              <div className="text-5xl mb-4">📜</div>
              <h3 className="text-xl font-bold mb-3">Interactive Timeline</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Animated timeline with scroll-triggered effects
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🔗', title: 'GitHub Integration', desc: 'Auto-import repositories' },
              { icon: '💬', title: 'Friend Reviews', desc: 'Testimonials and feedback' },
              { icon: '📌', title: 'Profile Switch', desc: 'Toggle between portfolio views' },
              { icon: '✍️', title: 'Blog Articles', desc: 'Share your journey and insights' },
              { icon: '🎯', title: 'Responsive Design', desc: 'Perfect on all devices' },
              { icon: '⚡', title: 'Fast Performance', desc: 'Optimized for speed' }
            ].map((feature, index) => (
              <div key={index} className="card text-center hover-lift">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
