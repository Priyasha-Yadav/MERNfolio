// frontend/src/components/Profile.js
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("firebase_token"); // Retrieve the token

      if (!token) {
        setError("No token found, please log in!");
        return;
      }

      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Send token in header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, []); // Fetch profile on component mount

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <img src={profile.profilePicture} alt="Profile" />
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
