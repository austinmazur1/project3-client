import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleProductFetch from "../containers/SingleProductFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPrice, setCurrentPrice] = useState(0); 

  const handlePriceChange = (event) => {
    setCurrentPrice(event.target.value);
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      currentPrice
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/buyer/${id}`, data, {
        // added this to get access to user data when we upload product
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setCurrentPrice()
        navigate(`/buyer/${id}`);
      });
  };

  const renderProduct = (product, seller) => {
    return (
      <div>
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
        <h4>{seller.name}</h4>
        <h4>{seller.email}</h4>

        <form onSubmit={handleSubmit}>
          <label>
            Bid:
            <input type="number" value={currentPrice} placeholder={`${product.startingPrice}`} onChange={handlePriceChange} />
          </label>
          <button type="submit">Place a bid</button>
        </form>
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
