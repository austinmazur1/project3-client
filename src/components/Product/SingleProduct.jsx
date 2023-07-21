import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SingleProductFetch from "../containers/SingleProductFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [updateName, setUpdateName] = useState('')
  const [updateDescription, setUpdateDescription] = useState('')
  const { user, storeToken, authenticationUser } = useContext(AuthContext);
  console.log("user", user);

  const handlePriceChange = (event) => {
    setCurrentPrice(event.target.value);
  };


   const handleNameUpdate = (event) => {
    setUpdateName(event.target.value)
   }
   const handleDescriptionUpdate = (event) => {
    setUpdateDescription(event.target.value)
   }

  let bidder;

  if (user.buyer) {
    bidder = user._id;
  }
  // console.log("bidder", bidder);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      currentPrice,
      currentBidder: bidder,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/buyer/${id}`, data, {
        // added this to get access to user data when we upload product
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setCurrentPrice();
        navigate(`/buyer/${id}`);
      });
  };

const handleUpdate = (e) => {
e.preventDefault();
const update = {
  productName: updateName,
  description: updateDescription
};

axios
      .post(`${process.env.REACT_APP_SERVER_URL}/seller/${id}`, update, {
        // added this to get access to user data when we upload product
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setCurrentPrice();
        navigate('/seller/dashboard');
      });
}


const handleDelete = async (e) => {
  e.preventDefault();

  axios.delete(`${process.env.REACT_APP_SERVER_URL}/seller/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  }) 
  .then((response) => {
    navigate('/seller/dashboard')
  })
}

  const renderProduct = (product, seller) => {
    return (
      <div>
        <img src={product.imageUrl} alt={product.name} />
        <h1>{product.productName}</h1>
        <h3>{product.description}</h3>
        <p>Starting price: {product.startingPrice}</p>
        <p>Current price: {product.currentPrice}</p>
        <p>Duration: {product.duration}</p>
        <p>Time left: {product.timer}</p>
        {/* (starting date + timer duration) - current date */}
        <p>{product.auctionStarted}</p>
        <p>{product.auctionEnded}</p>
        {/* <p>{product.bids}</p> map through the bids */}
        <p>{product.currentBidder}</p>

        {!user.seller ? (
          <>
          
            <h4>{seller.name}</h4>
            <h4>{seller.email}</h4>
            <form onSubmit={handleSubmit}>
              <label>
                Bid:
                <input
                  type="number"
                  value={currentPrice}
                  placeholder={`${product.startingPrice}`}
                  onChange={handlePriceChange}
                />
              </label>
              <button type="submit">Place a bid</button>
            </form>
          </>
        ) : (
          <>
          <form onSubmit={handleUpdate}>
            <label>Product name</label>
            <input type='text' value={updateName} placeholder={product.productName} onChange={handleNameUpdate} />
            <label>Description</label>
            <button onClick={handleDelete}>Delete product</button>
            <input type='text' value={updateDescription} placeholder={product.description} onChange={handleDescriptionUpdate} />
            <button type="submit">Save changes</button>
          </form>

            <p>Current bidder is: {product.currentBidder}</p>
          </>
        )}
      </div>
    );
  };

  return (
    <SingleProductFetch
      url={`${process.env.REACT_APP_SERVER_URL}/buyer/${id}`}
      render={renderProduct}
    />
  );
};

export default SingleProduct;
