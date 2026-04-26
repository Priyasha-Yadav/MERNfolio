import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Home = () => {
  const { user } = useAuth();

  const heroFeatures = [
    {
      iconClass: 'theme-icon-1',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
      title: 'Multiple Themes',
      desc: 'Six curated themes with unique gradients, colors, and dark mode support'
    },
    {
      iconClass: 'theme-icon-2',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
      title: 'Gamified Skills',
      desc: 'XP system with levels, progress bars, and achievement badges'
    },
    {
      iconClass: 'theme-icon-3',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Interactive Timeline',
      desc: 'Scroll-triggered animations with experience & education history'
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      title: 'GitHub Integration',
      desc: 'Auto-import your repositories'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
      title: 'Friend Reviews',
      desc: 'Testimonials and feedback'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      ),
      title: 'Profile Switch',
      desc: 'Toggle between portfolio views'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      title: 'Responsive Design',
      desc: 'Perfect on all devices'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Fast Performance',
      desc: 'Optimized for speed'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'Secure Auth',
      desc: 'Firebase authentication'
    }
  ];

  return (
    <div className="min-h-screen page-bg overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Ambient background blobs - theme-aware */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl animate-float gradient-bg opacity-10" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl animate-float gradient-bg opacity-10" style={{animationDelay: '3s'}} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 theme-badge border rounded-full text-sm font-medium mb-8 animate-fadeIn">
            <div className="w-2 h-2 theme-dot rounded-full animate-pulse" />
            Open-source MERN Portfolio Builder
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 tracking-tight animate-slideInDown" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
            <span className="gradient-text">
              MERNfolio
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl font-medium theme-heading mb-4 animate-slideInUp" style={{animationDelay: '0.2s'}}>
            Build Your Professional Portfolio
          </p>
          <p className="text-lg theme-text mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeIn" style={{animationDelay: '0.4s'}}>
            Create stunning developer portfolios with gamified skills, interactive
            timelines, multiple themes, and seamless GitHub integration.
          </p>

          <div className="flex gap-4 justify-center mb-20 animate-fadeIn" style={{animationDelay: '0.6s'}}>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="group relative px-8 py-3.5 text-white font-semibold rounded-xl theme-cta transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Dashboard
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  to={`/portfolio/${user.uid}`}
                  className="px-8 py-3.5 font-semibold border-2 theme-btn-outline rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  My Portfolio
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="group relative px-8 py-3.5 text-white font-semibold rounded-xl theme-cta transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3.5 font-semibold border-2 theme-btn-outline rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroFeatures.map((feature, index) => (
              <div
                key={index}
                className="card hover-lift animate-fadeIn text-left"
                style={{animationDelay: `${0.8 + index * 0.15}s`}}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${feature.iconClass}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 theme-heading">{feature.title}</h3>
                <p className="text-sm theme-text leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 theme-section-bg border-t border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 theme-heading" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              Everything You Need
            </h2>
            <p className="text-lg theme-text max-w-xl mx-auto">
              A complete toolkit to build and share your developer portfolio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group card theme-card-border hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold mb-1.5 theme-heading">{feature.title}</h3>
                <p className="text-sm theme-text">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t" style={{borderColor: 'inherit'}}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm theme-text-muted">
            Built with React, Node.js, Express & MongoDB
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
