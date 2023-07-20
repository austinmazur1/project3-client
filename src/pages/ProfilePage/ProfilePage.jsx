import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you use Axios for HTTP requests

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user"); // Replace '/api/user' with your backend API endpoint to fetch user data
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    // Reset any changes made by reverting to the original user data
    fetchUserData();
  };

  const handleSaveClick = async () => {
    try {
      // If a new profile picture is selected, upload it to the server first
      if (profilePicture) {
        const formData = new FormData();
        formData.append("profilePicture", profilePicture);

        const uploadResponse = await axios.post("/api/upload", formData); // Replace '/api/upload' with your backend API endpoint for profile picture upload

        // Assuming the backend returns the uploaded image URL
        setUserData((prevUserData) => ({
          ...prevUserData,
          profilePicture: uploadResponse.data.imageUrl,
        }));
      }

      // Update other user data (name, email, dateOfBirth, etc.)
      await axios.put("/api/user", userData); // Replace '/api/user' with your backend API endpoint to update user data
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <h2>Personal Information</h2>
        {/* Display existing profile picture (if available) */}
        {userData.profilePicture && (
          <img
            src={userData.profilePicture}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        )}
        {editMode ? (
          // Input field for profile picture upload
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        ) : null}
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Date of Birth: {userData.dateOfBirth}</p>
        {editMode ? (
          // Input fields for edit mode
          <>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleInputChange}
            />
          </>
        ) : null}
        {editMode ? (
          // Save and Cancel buttons for edit mode
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          // Edit button when not in edit mode
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
      {/* Add more sections for Contact Information, Change Password, etc. */}
    </div>
  );
};

export default ProfilePage;
