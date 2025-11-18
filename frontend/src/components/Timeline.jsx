import { useState, useEffect, useRef } from 'react';

const Timeline = ({ experiences = [], education = [], certifications = [] }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);

  // Combine all timeline items
  const timelineItems = [
    ...experiences.map(item => ({ ...item, type: 'experience', icon: '💼' })),
    ...education.map(item => ({ ...item, type: 'education', icon: '🎓' })),
    ...certifications.map(item => ({ ...item, type: 'certification', icon: '🏆' }))
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
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
      
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
            <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full shadow-lg">
              <span className="text-2xl">{item.icon}</span>
            </div>
            
            {/* Content */}
            <div className="ml-6 flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title || item.degree || item.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.type === 'experience' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : item.type === 'education'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {item.type}
                  </span>
                </div>
                
                <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">
                  {item.company || item.institution || item.issuer}
                </p>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {item.duration || item.date || `${item.startDate} - ${item.endDate || 'Present'}`}
                </p>
                
                {item.description && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                )}
                
                {item.skills && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
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