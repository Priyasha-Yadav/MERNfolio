import { useState, useEffect, useRef } from 'react';

const TimelineIcon = ({ type }) => {
  if (type === 'experience') return (
    <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  );
  if (type === 'education') return (
    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
  return (
    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
};

const Timeline = ({ experiences = [], education = [], certifications = [] }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);

  // Combine all timeline items
  const timelineItems = [
    ...experiences.map(item => ({ ...item, type: 'experience' })),
    ...education.map(item => ({ ...item, type: 'education' })),
    ...certifications.map(item => ({ ...item, type: 'certification' }))
  ].sort((a, b) => new Date(b.startDate || b.date) - new Date(a.startDate || a.date));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineElements = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [timelineItems]);

  if (timelineItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No timeline items to display</p>
      </div>
    );
  }

  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-pink-500 to-violet-300"></div>
      
      <div className="space-y-8">
        {timelineItems.map((item, index) => (
          <div
            key={index}
            data-index={index}
            className={`timeline-item relative flex items-start transition-all duration-700 ${
              visibleItems.has(index) 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">
              <TimelineIcon type={item.type} />
            </div>
            
            {/* Content */}
            <div className="ml-6 flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title || item.degree || item.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                    item.type === 'experience' 
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                      : item.type === 'education'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                  }`}>
                    {item.type}
                  </span>
                </div>
                
                <p className="text-base font-medium text-violet-600 dark:text-violet-400 mb-1">
                  {item.company || item.institution || item.issuer}
                </p>
                
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-3">
                  {item.duration || item.date || `${item.startDate} - ${item.endDate || 'Present'}`}
                </p>
                
                {item.description && (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {item.description}
                  </p>
                )}
                
                {item.skills && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;