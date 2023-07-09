/*import { useState } from "react";
import axios from "axios";
import React from "react";

function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      productName: productName,
      description: description,
      startingPrice: startingPrice,
      duration: duration,
      images: [images],
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/seller/new-product`, body)
      .then((response) => {
        setProductName("");
        setDescription("");
        setStartingPrice(0);
        setDuration(0);
        setImages([]);
      });
  };

  return (
    <div>
      Add Ne Product
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
          type="file"
          name="images"
          onChange={(e) => setImages(Array.from(e.target.files))}
          value={images}
        />
        

        <button type="submit">Upload product</button>
      </form>
    </div>
  );
}


export default AddProductPage;
*/

import { useState } from "react";
import axios from "axios";
import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  //try this when we figure out how to add multiple images
  // const [images, setImages] = useState([]); 


  // const onDrop = useCallback((acceptedFiles) => {
  //   setImages(acceptedFiles);
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
    console.log(e.target.files[0])
    // console.log(e)
    // console.log(e.target)
  } 


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("startingPrice", startingPrice);
    formData.append("duration", duration);
    formData.append("image", selectedImage);

    // images.forEach((image, index) => {
    //   formData.append(`image${index}`, image);
    // });

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/seller/new-product`, formData)
      .then((response) => {
        setProductName("");
        setDescription("");
        setStartingPrice(0);
        setDuration(0);
        setSelectedImage(null);
        // setImages([]);
        // console.log("form data",formData)
      });
  };

  return (
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
        {/* <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag and drop some files here, or click to select files</p>
          )}
        </div> */}

        <input onChange={handleFileChange} type="file" id="file-input" name="ImageStyle"/>

        <button type="submit">Upload product</button>
      </form>
    </div>
  );
}

export default AddProductPage;
