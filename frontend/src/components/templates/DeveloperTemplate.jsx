import FriendsReviews from '../FriendsReviews';

const DeveloperTemplate = ({ portfolio, contactInfo, profileInfo = {}, onSubmitContact, reviews = [], onAddReview, portfolioId }) => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const name = profileInfo.displayName || 'Developer';
  const tagline = profileInfo.tagline || 'Software Engineer';
  const avatar = profileInfo.profileImage;

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen font-mono">
      {/* Terminal Header */}
      <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-500 ml-2">{name.toLowerCase().replace(/\s+/g, '_')}_portfolio.sh</span>
          </div>
          <div className="flex gap-4 text-xs">
            {['skills', 'projects', 'experience', 'contact'].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="text-gray-500 hover:text-green-400 transition-colors capitalize">{s}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Hero */}
        <section className="animate-fadeIn">
          <p className="text-green-400 mb-2 text-sm">$ whoami</p>
          <div className="flex items-center gap-6 mb-6">
            {avatar && (
              <img
                src={avatar}
                alt={name}
                className="w-20 h-20 rounded-xl object-cover border-2 border-green-500/30 shadow-lg shadow-green-500/10"
              />
            )}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-1" style={{fontFamily: "'Space Grotesk', monospace"}}>
                {name}
              </h1>
              {tagline && (
                <p className="text-cyan-400 text-sm">{tagline}</p>
              )}
            </div>
          </div>
          {portfolio.about && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <p className="text-gray-300 leading-relaxed text-sm"><span className="text-cyan-400">/** </span>{portfolio.about}<span className="text-cyan-400"> */</span></p>
            </div>
          )}
          {/* Social links */}
          <div className="flex gap-3 mt-6">
            {contactInfo.email && <a href={`mailto:${contactInfo.email}`} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-400 hover:text-white transition-all border border-gray-700">{contactInfo.email}</a>}
            {contactInfo.github && <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-400 hover:text-white transition-all border border-gray-700 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>GitHub</a>}
            {contactInfo.linkedin && <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-400 hover:text-white transition-all border border-gray-700 flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>LinkedIn</a>}
          </div>
        </section>

        {/* Skills */}
        {portfolio.skills?.length > 0 && (
          <section id="skills">
            <p className="text-green-400 mb-4 text-sm">$ cat skills.json</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {portfolio.skills.map((skill, i) => (
                <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-green-500/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-white">{skill.name}</span>
                    <span className="text-xs text-green-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-green-400 to-cyan-400 h-1.5 rounded-full transition-all duration-1000" style={{width: `${skill.level}%`}} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {portfolio.projects?.length > 0 && (
          <section id="projects">
            <p className="text-green-400 mb-4 text-sm">$ ls -la ./projects/</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.projects.map((project, i) => (
                <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/5 group">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="px-2 py-0.5 bg-gray-800 text-[10px] text-cyan-400 rounded border border-gray-700">{tech}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1">[source]</a>}
                    {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-cyan-400 transition-colors flex items-center gap-1">[demo]</a>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {portfolio.experience?.length > 0 && (
          <section id="experience">
            <p className="text-green-400 mb-4 text-sm">$ git log --oneline --graph career</p>
            <div className="space-y-4">
              {portfolio.experience.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-green-400 mt-1.5" />
                    {i < portfolio.experience.length - 1 && <div className="w-0.5 flex-1 bg-gray-800 mt-1" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-white font-semibold">{exp.title}</p>
                    <p className="text-cyan-400 text-sm">{exp.company}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{exp.duration}</p>
                    {exp.description && <p className="text-gray-400 text-xs mt-2 leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {portfolio.education?.length > 0 && (
          <section>
            <p className="text-green-400 mb-4 text-sm">$ cat education.json</p>
            <div className="space-y-3">
              {portfolio.education.map((edu, i) => (
                <div key={i} className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-blue-500/30 transition-colors">
                  <p className="text-white font-semibold">{edu.degree}</p>
                  <p className="text-blue-400 text-sm">{edu.institution}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{edu.duration}</p>
                  {edu.description && <p className="text-gray-400 text-xs mt-2">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {portfolio.certifications?.length > 0 && (
          <section>
            <p className="text-green-400 mb-4 text-sm">$ ls ~/certs/</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {portfolio.certifications.map((cert, i) => (
                <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm font-semibold">{cert.title}</p>
                    <p className="text-gray-500 text-xs">{cert.issuer}{cert.date ? ` — ${cert.date}` : ''}</p>
                  </div>
                  {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline">[verify]</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact">
          <p className="text-green-400 mb-4 text-sm">$ echo "Let's connect"</p>
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 text-center">
            <h3 className="text-2xl font-bold text-white mb-3" style={{fontFamily: "'Space Grotesk', monospace"}}>Let's Build Something</h3>
            <p className="text-gray-400 text-sm mb-6">Open for collaborations and new opportunities.</p>
            <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-500 text-gray-900 font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all hover:scale-105">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              {contactInfo.email || 'Send Email'}
            </a>
          </div>
        </section>

        {/* Friends' Reviews */}
        <FriendsReviews
          reviews={reviews}
          onAddReview={onAddReview}
          variant="developer"
          portfolioId={portfolioId}
        />

        <footer className="text-center py-8 text-xs text-gray-600 border-t border-gray-800">
          <p>Built with MERNfolio — <span className="text-green-400">exit 0</span></p>
        </footer>
      </div>
    </div>
  );
};

export default DeveloperTemplate;
