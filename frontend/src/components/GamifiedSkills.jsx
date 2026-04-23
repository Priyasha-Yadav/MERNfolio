import { useState, useEffect } from 'react';

const GamifiedSkills = ({ skills = [] }) => {
  const [animatedSkills, setAnimatedSkills] = useState([]);

  useEffect(() => {
    // Add XP and level calculations to skills
    const processedSkills = skills.map(skill => {
      const xp = skill.level * 10; // Convert level to XP
      const level = Math.floor(skill.level / 20) + 1; // Every 20 points = 1 level
      const nextLevelXP = level * 200;
      const currentLevelXP = (level - 1) * 200;
      const progressToNext = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
      
      return {
        ...skill,
        xp,
        level,
        progressToNext: Math.min(progressToNext, 100),
        badge: getBadge(skill.level),
        color: getSkillColor(skill.level)
      };
    });

    // Animate skills on mount
    setTimeout(() => {
      setAnimatedSkills(processedSkills);
    }, 100);
  }, [skills]);

  const getBadge = (level) => {
    if (level >= 90) return { name: 'Expert', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' };
    if (level >= 75) return { name: 'Advanced', color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' };
    if (level >= 60) return { name: 'Proficient', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' };
    if (level >= 40) return { name: 'Intermediate', color: 'text-violet-500 bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800' };
    return { name: 'Beginner', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' };
  };

  const getSkillColor = (level) => {
    if (level >= 90) return 'from-amber-400 to-orange-500';
    if (level >= 75) return 'from-orange-400 to-red-500';
    if (level >= 60) return 'from-blue-400 to-violet-500';
    if (level >= 40) return 'from-violet-400 to-purple-500';
    return 'from-emerald-400 to-teal-500';
  };

  const getBadgeIcon = (level) => {
    if (level >= 90) return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
      </svg>
    );
    if (level >= 75) return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M18.75 4.236V2.721M14.503 14.25a7.454 7.454 0 00.981-3.172M14.503 14.25H9.497" />
      </svg>
    );
    if (level >= 60) return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    );
    if (level >= 40) return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    );
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    );
  };

  if (skills.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No skills to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {animatedSkills.map((skill, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeIn border border-gray-100 dark:border-gray-700/50"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Skill Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {skill.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`${skill.badge.color.split(' ')[0]}`}>
                {getBadgeIcon(skill.level)}
              </span>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                Lv.{skill.level}
              </span>
            </div>
          </div>

          {/* XP Display */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.xp} XP
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${skill.badge.color}`}>
                {skill.badge.name}
              </span>
            </div>
            
            {/* XP Progress Bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
              <div
                className={`bg-gradient-to-r ${skill.color} h-2.5 rounded-full transition-all duration-1000 relative`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1.5">
              <span>0%</span>
              <span className="font-medium text-gray-600 dark:text-gray-400">{skill.level}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Level Progress
              </span>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                {skill.progressToNext.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
              <div
                className="bg-gradient-to-r from-violet-500 to-pink-500 h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${skill.progressToNext}%` }}
              ></div>
            </div>
          </div>

          {/* Skill Stats */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-2.5 border border-blue-100 dark:border-blue-800/30">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {skill.level}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Proficiency
              </div>
            </div>
            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-2.5 border border-violet-100 dark:border-violet-800/30">
              <div className="text-lg font-bold text-violet-600 dark:text-violet-400">
                {skill.xp}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Experience
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamifiedSkills;