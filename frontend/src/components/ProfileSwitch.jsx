import { useState, useEffect } from 'react';

const ProfileSwitch = ({ onProfileSelect }) => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('personal');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPublicProfiles();
  }, []);

  const loadPublicProfiles = async () => {
    setLoading(true);
    try {
      // Mock profiles — replace with API call later
      const mockProfiles = [
        {
          id: 'personal',
          name: 'Personal Portfolio',
          type: 'personal',
          description: 'Your personal portfolio'
        },
        {
          id: 'shared-1',
          name: 'John Doe',
          type: 'shared',
          description: 'Full Stack Developer'
        },
        {
          id: 'shared-2',
          name: 'Jane Smith',
          type: 'shared',
          description: 'UI/UX Designer'
        }
      ];

      setProfiles(mockProfiles);
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (profileId) => {
    setSelectedProfile(profileId);
    const profile = profiles.find((p) => p.id === profileId);
    onProfileSelect?.(profile);
  };

  const getProfileIcon = (type) => {
    if (type === 'personal') return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    );
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Profile View
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Switch Mode
          </span>

          {/* Toggle */}
          <button
            className={`w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${
              selectedProfile === 'personal'
                ? 'bg-violet-600'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() =>
              handleProfileChange(
                selectedProfile === 'personal' ? 'shared-1' : 'personal'
              )
            }
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                selectedProfile === 'personal'
                  ? 'translate-x-0.5'
                  : 'translate-x-[22px]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Profile list */}
      <div className="space-y-2">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => handleProfileChange(profile.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
              selectedProfile === profile.id
                ? 'bg-violet-50 dark:bg-violet-900/20 border-2 border-violet-200 dark:border-violet-700'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              selectedProfile === profile.id
                ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              {getProfileIcon(profile.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 dark:text-white truncate">
                {profile.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {profile.description}
              </div>
            </div>

            {selectedProfile === profile.id && (
              <div className="text-violet-600 dark:text-violet-400 flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Shared-view notice */}
      {selectedProfile !== 'personal' && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-700/30">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
              You're viewing a shared portfolio
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSwitch;
