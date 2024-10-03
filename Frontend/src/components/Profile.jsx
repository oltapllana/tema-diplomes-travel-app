import React, { useEffect, useState } from "react";
import { FaUserCircle, FaUpload } from "react-icons/fa";
import MainHeader from "./MainHeader";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://tema-diplomes-travel-app.onrender.com/profile/${localStorage.getItem("id")}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userProfile = await response.json();
        setProfile(userProfile);
        setEditedProfile(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
      }
    };
    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      const updatedFields = {};

      for (const key in editedProfile) {
        if (editedProfile[key] !== profile[key]) {
          updatedFields[key] = editedProfile[key];
        }
      }

      if (profilePicture) {
        updatedFields.profilePicture = profilePicture;
      }

      for (const key in updatedFields) {
        formData.append(key, updatedFields[key]);
      }

      if (Object.keys(updatedFields).length === 0) {
        setIsEditing(false);
        return;
      }

      const response = await fetch(
        `https://tema-diplomes-travel-app.onrender.com/profile/${localStorage.getItem("id")}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw error;
    }
  };

  return (
    <>
      <MainHeader />
      <div className="aa">
        <div className="profile-container">
          <div>
            <div className="profile-image">
              {!profile?.profilePicture && <FaUserCircle size={100} />}
              {profile?.profilePicture && (
                <img
                  src={require(`../../../Backend/uploads/${profile.profilePicture}`)}
                />
              )}
            </div>
            <div className="profile-image-upload">
              <input
                type="file"
                id="profilePictureInput"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ display: "none" }}
              />
              {isEditing && (
                <label htmlFor="profilePictureInput">
                  <FaUpload
                    size={20}
                    className="upload-icon"
                    onClick={() => console.log("img upload click")}
                  />
                </label>
              )}
            </div>
          </div>
          {profile && (
            <>
              <div className="profile-details">
                <div className="profile-field">
                  <label>FirstName</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editedProfile?.firstName}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="profile-field">
                  <label>LastName</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editedProfile?.lastName}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div className="profile-details">
                <div className="profile-field">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editedProfile?.username}
                    readOnly
                  />
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile?.email}
                    readOnly
                  />
                </div>
              </div>
              <button
                className="send-button"
                onClick={isEditing ? handleSaveClick : handleEditClick}
              >
                {isEditing ? "Ruaj" : "Ndrysho"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
