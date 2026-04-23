import GamifiedSkills from '../GamifiedSkills';
import Timeline from '../Timeline';
import ContactSection from '../ContactSection';

const MinimalTemplate = ({ portfolio, contactInfo, onSubmitContact, reviews = [] }) => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {/* Header */}
      <header className="mb-20 animate-fadeIn">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {(portfolio.about || 'P').charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              Portfolio
            </h1>
            {contactInfo.location && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                {contactInfo.location}
              </p>
            )}
          </div>
        </div>
        {/* Social row */}
        <div className="flex gap-3 mb-8">
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="text-sm text-violet-600 dark:text-violet-400 hover:underline">{contactInfo.email}</a>
          )}
          {contactInfo.github && <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>}
          {contactInfo.linkedin && <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>}
          {contactInfo.twitter && <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>}
        </div>
        {portfolio.about && (
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-violet-500 pl-6">{portfolio.about}</p>
        )}
      </header>

      {/* Skills */}
      {portfolio.skills?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-8">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {portfolio.skills.map((skill, i) => (
              <div key={i} className="group relative px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors border border-gray-200 dark:border-gray-700">
                <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{skill.name}</span>
                <span className="ml-2 text-xs text-gray-400">{skill.level}%</span>
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 rounded-b-xl transition-all duration-300" style={{width: `${skill.level}%`}} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {portfolio.projects?.length > 0 && (
        <section className="mb-20" id="projects">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-8">Projects</h2>
          <div className="space-y-6">
            {portfolio.projects.map((project, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{project.description}</p>
                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, j) => (
                          <span key={j} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded-md">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {project.repoLink && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>}
                    {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-violet-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg></a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {portfolio.experience?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-8">Experience</h2>
          <div className="space-y-8">
            {portfolio.experience.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-violet-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                <p className="text-sm font-medium text-violet-600 dark:text-violet-400">{exp.company}</p>
                <p className="text-xs text-gray-400 mt-0.5 mb-2">{exp.duration}</p>
                {exp.description && <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {portfolio.education?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-8">Education</h2>
          <div className="space-y-6">
            {portfolio.education.map((edu, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-800">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{edu.institution}</p>
                <p className="text-xs text-gray-400 mt-0.5 mb-2">{edu.duration}</p>
                {edu.description && <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {portfolio.certifications?.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-8">Certifications</h2>
          <div className="space-y-3">
            {portfolio.certifications.map((cert, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{cert.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer}{cert.date ? ` — ${cert.date}` : ''}</p>
                </div>
                {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex-shrink-0">View →</a>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="mb-16">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-6">Get in Touch</h2>
        <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-900/10 dark:to-pink-900/10 border border-violet-100 dark:border-violet-800/30">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Interested in working together? Let's talk.</p>
          <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            Send an Email
          </a>
        </div>
      </section>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-8">Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(s => <svg key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-amber-400' : 'text-gray-200 dark:text-gray-700'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-3">"{review.comment}"</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">— {review.reviewerName}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
