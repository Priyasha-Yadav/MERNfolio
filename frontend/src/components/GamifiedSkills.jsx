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
    if (level >= 90) return { name: 'Expert', icon: '👑', color: 'text-yellow-500' };
    if (level >= 75) return { name: 'Advanced', icon: '🥇', color: 'text-orange-500' };
    if (level >= 60) return { name: 'Proficient', icon: '🥈', color: 'text-gray-500' };
    if (level >= 40) return { name: 'Intermediate', icon: '🥉', color: 'text-amber-600' };
    return { name: 'Beginner', icon: '🌱', color: 'text-green-500' };
  };

  const getSkillColor = (level) => {
    if (level >= 90) return 'from-yellow-400 to-orange-500';
    if (level >= 75) return 'from-orange-400 to-red-500';
    if (level >= 60) return 'from-blue-400 to-purple-500';
    if (level >= 40) return 'from-green-400 to-blue-500';
    return 'from-gray-400 to-gray-600';
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
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeIn"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Skill Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {skill.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`text-2xl ${skill.badge.color}`}>
                {skill.badge.icon}
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${skill.badge.color} bg-opacity-20`}>
                {skill.badge.name}
              </span>
            </div>
            
            {/* XP Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 relative`}
                style={{ width: `${skill.level}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>0%</span>
              <span className="font-medium">{skill.level}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Level Progress
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {skill.progressToNext.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${skill.progressToNext}%` }}
              ></div>
            </div>
          </div>

          {/* Skill Stats */}
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {skill.level}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Proficiency
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {skill.xp}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
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