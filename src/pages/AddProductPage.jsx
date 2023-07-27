import { useState } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import productService from "../services/product.service";
import { useContext } from "react";
function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [serverMessage, setServerMessage] = useState('')
  const {user} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    console.log("e.target files", e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("imageUrl", file);

    productService
      .imageUpload(formData)
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
    productService
      .createProduct(data)
      .then((response) => {
        setProductName("");
        setDescription("");
        setStartingPrice(0);
        setDuration(0);
        setImageUrl("");
        navigate("/seller/dashboard");
      })
      .catch((error) => {
        if(error.response && error.response.data && error.response.data.message) {
          setServerMessage(error.response.data.message)
        }
      })
  };

  return (
    <AuthContext.Consumer>
      {({ isLoggedIn, user }) => (
        <div className="flex justify-center items-center h-screen">
  <form onSubmit={handleSubmit} className="w-96 bg-white shadow-md rounded-md p-6 space-y-12">
    <h2 className="text-base font-semibold leading-7 text-gray-900">Add New Product</h2>

    <div className="col-span-full">
      <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
        Name
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="productName"
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-full">
      <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
        Description
      </label>
      <div className="mt-2">
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-full">
      <label htmlFor="startingPrice" className="block text-sm font-medium leading-6 text-gray-900">
        Starting Price
      </label>
      <div className="mt-2">
        <input
          type="number"
          name="startingPrice"
          onChange={(e) => setStartingPrice(e.target.value)}
          value={startingPrice}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-full">
      <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
        Duration in minutes
      </label>
      <div className="mt-2">
        <input
          type="number"
          name="duration"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div className="col-span-full">
      <label htmlFor="file-input" className="block text-sm font-medium leading-6 text-gray-900">
        Images
      </label>
      <div className="mt-2">
        <input
          onChange={handleFileUpload}
          type="file"
          id="file-input"
          name="ImageStyle"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
    {serverMessage && <p className="col-span-full text-sm text-red-600">{serverMessage}</p>}

    <div className="col-span-full mt-6 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Upload product
      </button>
    </div>
  </form>
</div>


      )}
    </AuthContext.Consumer>
  );
}

export default AddProductPage;
