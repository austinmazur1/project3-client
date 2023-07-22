import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you use Axios for HTTP requests

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    additional: "",
    zipCode: "",
  });

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user"); // Replace '/api/user' with your backend API endpoint to fetch user data
      setUserData(response.data);
      setAddress(
        response.data.address || {
          country: "",
          city: "",
          street: "",
          houseNumber: "",
          additional: "",
          zipCode: "",
        }
      );
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
    setAddress(
      userData.address || {
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        additional: "",
        zipCode: "",
      }
    );
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

      // Update the address separately
      await axios.put("/api/user/address", address); // Replace '/api/user/address' with your backend API endpoint to update the address

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

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Save the edited address
  const handleAddressSave = async () => {
    try {
      // Update the address separately
      await axios.put("/api/user/address", address); // Replace '/api/user/address' with your backend API endpoint to update the address

      setEditMode(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
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

      {/* Change Password Section */}
      {editMode ? (
        <div>
          <h2>Change Password</h2>
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={passwordFields.currentPassword}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordFields.newPassword}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={passwordFields.confirmNewPassword}
            onChange={handlePasswordChange}
          />
          <button onClick={handlePasswordSave}>Change Password</button>
        </div>
      ) : null}

      {/* Address Section */}
      <div>
        <h2>Address</h2>
        {editMode ? (
          // Input fields for address in edit mode
          <>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="houseNumber"
              placeholder="House Number"
              value={address.houseNumber}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="additional"
              placeholder="Additional Address (Optional)"
              value={address.additional}
              onChange={handleAddressChange}
            />
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={address.zipCode}
              onChange={handleAddressChange}
            />
            <button onClick={handleAddressSave}>Save Address</button>
          </>
        ) : (
          // Display address when not in edit mode
          <>
            <p>Country: {userData.address?.country}</p>
            <p>City: {userData.address?.city}</p>
            <p>Street: {userData.address?.street}</p>
            <p>House Number: {userData.address?.houseNumber}</p>
            {userData.address?.additional && (
              <p>Additional: {userData.address?.additional}</p>
            )}
            <p>ZIP Code: {userData.address?.zipCode}</p>
          </>
        )}
      </div>
      {/* Add more sections for Contact Information, etc. */}
    </div>
  );
};

export default ProfilePage;
