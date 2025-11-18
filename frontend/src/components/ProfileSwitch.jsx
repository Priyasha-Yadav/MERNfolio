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
          icon: '👤',
          description: 'Your personal portfolio'
        },
        {
          id: 'shared-1',
          name: 'John Doe',
          type: 'shared',
          icon: '👨‍💻',
          description: 'Full Stack Developer'
        },
        {
          id: 'shared-2',
          name: 'Jane Smith',
          type: 'shared',
          icon: '👩‍🎨',
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Profile View
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Switch Mode
          </span>

          {/* Toggle */}
          <button
            className={`w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              selectedProfile === 'personal'
                ? 'bg-blue-600'
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
                  ? 'translate-x-0'
                  : 'translate-x-6'
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
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
              selectedProfile === profile.id
                ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent'
            }`}
          >
            <div className="text-2xl">{profile.icon}</div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {profile.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {profile.description}
              </div>
            </div>

            {selectedProfile === profile.id && (
              <div className="text-blue-600 dark:text-blue-400">
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
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">ℹ️</span>
            <span className="text-sm text-yellow-700 dark:text-yellow-300">
              You're viewing a shared portfolio
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSwitch;
