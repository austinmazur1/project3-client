import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import productService from "../../services/product.service";
import Loading from "../Loading/Loading";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [winner, setWinner] = useState(null);
  const [currentBidder, setCurrentBidder] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const { user } = useContext(AuthContext);
  const [updatedCurrentPrice, setUpdatedCurrentPrice] = useState(
    product?.currentPrice
  );
  const [isEditing, setIsEditing] = useState(false);

  const handlePriceChange = (event) => {
    setCurrentPrice(event.target.value);
  };

  const handleNameUpdate = (event) => {
    setUpdateName(event.target.value);
  };

  const handleDescriptionUpdate = (event) => {
    setUpdateDescription(event.target.value);
  };

  const fetchUpdatedCurrentPrice = async () => {
    try {
      if (user.buyer) {
        const response = await productService.getSingleProductBuyer(id);
        const { product } = response.data;
        setUpdatedCurrentPrice(product?.currentPrice);
      } else {
        const response = await productService.getSingleProductSeller(id);
        const { product } = response.data;
        setUpdatedCurrentPrice(product?.currentPrice);
      }
    } catch (error) {
      console.log(error, "error fetching");
    }
  };


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     fetchUpdatedCurrentPrice();
  //     setServerMessage("");
  //   }, 5000); // Fetch updated current price every 5 seconds

  //   return () => {
  //     clearInterval(intervalId); // Clear the interval when the component unmounts
  //   };
  // }, []);

  const handleWinner = () => {
    console.log('you won');
    // Send user an email?

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUpdatedCurrentPrice();
      setServerMessage("");
    }, 5000); // Fetch updated current price every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  const handleBid = (e) => {
    e.preventDefault();

    productService
      .updateWinner(id, currentBidder)
      .then(() => {
        // Handle any other logic when the winner is updated
      })
      .catch((error) => {
        console.log(error);
      });
    }
      
    

const handleBid = (e) => {
  e.preventDefault();
  productService
    .updateBid(id, currentPrice, user._id)
    .then(() => {
      setCurrentPrice(currentPrice);
      console.log(typeof currentPrice);
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setServerMessage(error.response.data.message); // Set the error message from the API response
      } else {
        setServerMessage("Error updating bid"); // Set a generic error message if no specific message is available
      }
      console.error("Error updating bid:", error);
    })
    .finally(() => {
      // Clear the server message after some time
      setTimeout(() => {
        setServerMessage("");
      }, 5000);
    });
};

  const handleUpdate = (e) => {
    e.preventDefault();
    const update = {
      productName: updateName,
      description: updateDescription,
    };
    productService
      .updateProduct(id, update)
      .then(() => {
        setIsEditing(false);
        navigate("/seller/dashboard");
      })
      .catch((error) => {
        console.log("Error updating product:", error);
      });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    productService
      .deleteProject(id)
      .then(() => {
        navigate("/seller/dashboard");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  useEffect(() => {
    if (user.seller) {
      productService.getSingleProductSeller(id).then((response) => {
        const { product, seller, currentBidder } = response.data;
        setProduct(product);
        setCurrentPrice(product?.currentPrice);
        setCurrentBidder(currentBidder);
        setSeller(seller);
        setIsLoading(false);
      });
    } else if (user.buyer) {
      productService.getSingleProductBuyer(id).then((response) => {
        const { product, seller, currentBidder } = response.data;
        setProduct(product);
        setCurrentPrice(product?.currentPrice);
        setCurrentBidder(currentBidder);
        setSeller(seller);
        setIsLoading(false);
      });
    } else {
      console.log("error");
    }
  }, [id, user.buyer, user.seller]);

  if (isLoading) {
    return <Loading />;
  }

  return (

//     <div>
//       <img src={product.imageUrl} alt={product.name} />
//       <h1>{product.productName}</h1>
//       <h3>{product.description}</h3>
//       <p>Starting price: {product.startingPrice}</p>
//       <p>Current price: {updatedCurrentPrice}</p>
//       <p>Duration: {product.duration} Minutes</p>
//       <p>Time left: {<CountdownTimer handleWinner={handleWinner} productId={id} timer={product.timer} currentBidder={currentBidder} />}</p>
//       <p>{product.auctionStarted}</p>
//       <p>{product.auctionEnded}</p>
//       {currentBidder ? (
//         <p>Highest bidder: {currentBidder.name}</p>
//       ) : (
//         <p>No bidders</p>
//       )}

//       {!user.seller ? (
//         <>
//           <h4>Seller: {seller.name}</h4>
//           <h4>{seller.email}</h4>
//           <form onSubmit={handleBid}>
//             {serverMessage && <p>{serverMessage}</p>}
//             <label>
//               Bid:
//               <input
//                 type="number"
//                 value={currentPrice}
//                 placeholder={`${product.startingPrice}`}
//                 onChange={handlePriceChange}
//               />
//             </label>
//             <p>{message}</p>
//             <button type="submit">Place a bid</button>
//           </form>
//         </>
//       ) : (
//         <>
//           <form onSubmit={handleUpdate}>
//             <label>Product name</label>
//             <input
//               type="text"
//               value={updateName}
//               placeholder={product.productName}
//               onChange={handleNameUpdate}
//             />
//             <label>Description</label>
//             <button onClick={handleDelete}>Delete product</button>
//             <input
//               type="text"
//               value={updateDescription}
//               placeholder={product.description}
//               onChange={handleDescriptionUpdate}
//             />
//             <button type="submit">Save changes</button>
//           </form>
//         </>
//       )}

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-4/5 p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          {/* Product Image */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-96 h-auto mr-8 rounded-lg shadow-md"
          />

          {/* Product Information */}
          <div className="flex-grow">
            <h1 className="text-3xl font-semibold">{product.productName}</h1>
            <h3 className="text-gray-600">{product.description}</h3>
            <p className="mt-4 text-lg text-gray-600">
              Starting price: ${product.startingPrice}
            </p>
            <p className="text-lg text-gray-600">
              Current price: ${updatedCurrentPrice}
            </p>
            <p className="text-lg text-gray-600">
              Duration: {product.duration} Minutes
            </p>
            <p className="text-lg text-gray-600">
              Time left:
            </p>
            <p className="text-lg text-green-600">
              {<CountdownTimer productId={id} timer={product.timer} />}
            </p>

            <p className="text-lg text-gray-600">
              Auction ended: {product.auctionEnded}
            </p>
            {currentBidder ? (
              <p className="text-lg text-gray-600">
                Highest bidder: {currentBidder.name}
              </p>
            ) : (
              <p className="text-lg text-gray-600">No bidders</p>
            )}

            {!user.seller ? (
              <div className="mt-6">
                <h4 className="text-xl font-semibold">Seller: {seller.name}</h4>
                <h4 className="text-gray-600">{seller.email}</h4>
                <form onSubmit={handleBid} className="mt-4">
                  {serverMessage && (
                    <p className="text-red-600">{serverMessage}</p>
                  )}
                  <label className="block">
                    Bid:
                    <input
                      type="number"
                      value={currentPrice}
                      placeholder={`${product.startingPrice}`}
                      onChange={handlePriceChange}
                      className="block mt-2 px-4 py-2 w-40 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-600">{message}</p>
                  <button
                    type="submit"
                    className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Place a bid
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-6">
                {/* Show "Edit product" button for sellers */}
                <button
                  onClick={() => setIsEditing(true)}
                  class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit product
                </button>
                {/* Show the edit form when isEditing is true */}
                {isEditing && (
                  <form onSubmit={handleUpdate} className="mt-4">
                    <label className="block">
                      Product name
                      <input
                        type="text"
                        value={updateName}
                        placeholder={product.productName}
                        onChange={handleNameUpdate}
                        className="inline-flex items-center block mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </label>
                    <label className="block mt-4">
                      Description
                      <input 
                        type="text"
                        value={updateDescription}
                        placeholder={product.description}
                        onChange={handleDescriptionUpdate}
                        className="inline-flex items-center block mt-10 mb-10 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </label>
                    <button
                      type="submit"
                      class="inline-flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save changes
                    </button>
                  </form>
                )}
                <button
                  onClick={handleDelete}
                  class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Delete product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
