import { useParams } from "react-router-dom";
import { useState } from "react";

import SingleProductFetch from "../containers/SingleProductFetch";

const SingleProduct = () => {
  const { id } = useParams();

  const [currentPrice, setCurrentPrice] = useState("startingPrice");
  const handleCurrentPrice = (e) => setCurrentPrice(e.target.value);

  const handleSubmit = (e) => {        
    e.preventDefault();
    const newMovie = { currentPrice };
 
    
  }

  const renderProduct = (product, seller) => {
    return (
      <div>
        <h1>{product.productName}</h1>
        <h3>{product.description}</h3>
        <p>Starting price: {product.startingPrice}</p>
        <p>Current price: {product.currentPrice}</p>
        <p>Duration: {product.duration}</p>
        <p>Time left: {product.timer}</p>
        <p>{product.auctionStarted}</p>
        <p>{product.auctionEnded}</p>
        {/* <p>{product.bids}</p> map through the bids */}
        <p>{product.currentBidder}</p>
        <h4>{seller.name}</h4>
        <h4>{seller.email}</h4>
      </div>
    );
  };

  return (
    <div>
      <SingleProductFetch
        url={`${process.env.REACT_APP_SERVER_URL}/buyer/${id}`}
        render={renderProduct}
      />

      <form onSubmit={handleSubmit}>
        <label>Bid:</label>
        <input
          type="number"
          name="currentPrice"
          value={currentPrice}
          onChange={handleCurrentPrice}
        />

        <button type="submit">Place a bid</button>
      </form>
    </div>
  );
};

export default SingleProduct;
