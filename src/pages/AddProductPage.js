import { useState } from "react";
import axios from "axios";
import React, { useCallback } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    console.log("e.target files", e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("imageUrl", file);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/upload`, formData)
      .then((res) => {
        const imageUrl = res.data.fileUrl;
        setImageUrl(imageUrl);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      productName,
      description,
      startingPrice,
      duration,
      imageUrl,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/seller/new-product`, data, {
        // added this to get access to user data when we upload product
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setProductName("");
        setDescription("");
        setStartingPrice(0);
        setDuration(0);
        setImageUrl("");
        navigate("/seller/dashboard");
      });
  };

  return (
    <AuthContext.Consumer>
      {({ isLoggedIn, user }) => (
        <div>
          Add New Product
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="productName"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />

            <label>Starting Price</label>
            <input
              type="number"
              name="startingPrice"
              onChange={(e) => setStartingPrice(e.target.value)}
              value={startingPrice}
            />

            <label>Duration</label>
            <input
              type="number"
              name="duration"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            />

            <label>Images</label>
            <input
              onChange={handleFileUpload}
              type="file"
              id="file-input"
              name="ImageStyle"
            />

            <button type="submit">Upload product</button>
          </form>
        </div>
      )}
    </AuthContext.Consumer>
  );
}

export default AddProductPage;
