import React, { useState, useEffect, useContext } from "react";
import axios from "axios"; // Assuming you use Axios for HTTP requests
import { AuthContext } from "../../context/auth.context";

const ProfilePage = () => {
  const {user} = useContext(AuthContext)
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    if (user && user._id) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/profile/${user._id}`); // Replace '/api/user' with your backend API endpoint to fetch user data
      setUserData(response.data);
      console.log(response.data.user)
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

      // Update other user data (first name, last name, email, dateOfBirth, etc.)
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

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handlePasswordSave = async () => {
    try {
      // Implement password change functionality with your backend API endpoint
      await axios.put("/api/changePassword", passwordFields); // Replace '/api/changePassword' with your backend API endpoint for changing passwords
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };
console.log(userData)
  return (
    <div className="container mx-auto px-4 py-8 w-9/12">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        {/* Display existing profile picture (if available) */}
        {/* {userData.user.profilePicture && (
          <img
            src={userData.user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
        )} */}
        {editMode ? (
          // Input field for profile picture upload
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mb-4 justify-start"
          />
        ) : null}
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">First Name:</label>
          {editMode ? (
            // Input field for first name in edit mode
            <input
              type="text"
              name="firstName"
              value={userData.user.firstName}
              onChange={handleInputChange}
              className="w-9/12 border rounded-md py-2 px-3"
            />
          ) : (
            <p>{userData.user.name}</p>
          )}
        </div>
        <div className="mb-4">
          {/* <label className="block mb-1 text-gray-600">Last Name:</label> */}
          {/* {editMode ? (
            // Input field for last name in edit mode
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="w-9/12 border rounded-md py-2 px-3"
            />
          ) : (
            <p>{userData.lastName}</p>
          )} */}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Email:</label>
          {editMode ? (
            // Input field for email in edit mode
            <input
              type="email"
              name="email"
              value={userData.user.email}
              onChange={handleInputChange}
              className="w-9/12 border rounded-md py-2 px-3"
            />
          ) : (
            <p>{userData.user.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-600">Address:</label>
          {editMode ? (
            // Input field for date of birth in edit mode
            <input
              type="date"
              name="dateOfBirth"
              value={userData.user.dateOfBirth}
              onChange={handleInputChange}
              className="w-9/12 border rounded-md py-2 px-3"
            />
          ) : (
            <p>{userData.user.address}</p>
          )}
        </div>
        {editMode ? (
          // Save and Cancel buttons for edit mode
          <div>
            <button
              onClick={handleSaveClick}
              class="m-4 inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          // Edit button when not in edit mode
          <button
            onClick={handleEditClick}
            class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        )}
      </div>

      {/* Change Password Section */}
      {editMode && (
        <div className="bg-white p-6 mt-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">
              Current Password:
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={passwordFields.currentPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">New Password:</label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordFields.newPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">
              Confirm New Password:
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={passwordFields.confirmNewPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded-md py-2 px-3"
            />
          </div>
          <button
            onClick={handlePasswordSave}
            class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Change Password
          </button>
        </div>
      )}

      {/* Add more sections for Contact Information, etc. */}
    </div>
  );
};

export default ProfilePage;
