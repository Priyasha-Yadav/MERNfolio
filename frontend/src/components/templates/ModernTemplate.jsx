import GamifiedSkills from '../GamifiedSkills';
import Timeline from '../Timeline';
import ProjectsSection from '../ProjectsSection';
import ContactSection from '../ContactSection';

const ModernTemplate = ({ portfolio, contactInfo, onSubmitContact }) => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500" />
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)'}} />
        <div className="relative max-w-6xl mx-auto px-6 py-28 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm mb-8 animate-fadeIn">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for opportunities
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 animate-slideInDown" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
            {portfolio.about ? portfolio.about.split('.')[0] : 'Welcome to My Portfolio'}
          </h1>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto animate-fadeIn" style={{animationDelay: '0.3s'}}>
            {portfolio.about ? portfolio.about.split('.').slice(1, 3).join('.').trim() : 'Explore my work and skills'}
          </p>
          <div className="flex justify-center gap-4 animate-fadeIn" style={{animationDelay: '0.5s'}}>
            <button onClick={() => scrollTo('projects')} className="px-8 py-3.5 bg-white text-violet-700 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              View Projects
            </button>
            <button onClick={() => scrollTo('contact')} className="px-8 py-3.5 border-2 border-white/40 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
              Contact Me
            </button>
          </div>
          {/* Social links in hero */}
          {(contactInfo.github || contactInfo.linkedin || contactInfo.twitter) && (
            <div className="flex justify-center gap-3 mt-10 animate-fadeIn" style={{animationDelay: '0.7s'}}>
              {contactInfo.github && (
                <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              )}
              {contactInfo.linkedin && (
                <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
              {contactInfo.twitter && (
                <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {portfolio.skills?.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white" style={{fontFamily: "'Space Grotesk', sans-serif"}}>Skills & Expertise</h2>
            <GamifiedSkills skills={portfolio.skills} />
          </section>
        )}
        {portfolio.projects?.length > 0 && <ProjectsSection projects={portfolio.projects} />}
        {portfolio.experience?.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white" style={{fontFamily: "'Space Grotesk', sans-serif"}}>My Journey</h2>
            <Timeline experiences={portfolio.experience || []} education={portfolio.education || []} certifications={portfolio.certifications || []} />
          </section>
        )}
        <ContactSection contactInfo={contactInfo} onSubmitContact={onSubmitContact} />
      </div>
    </>
  );
};

export default ModernTemplate;
