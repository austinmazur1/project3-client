import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import productService from "../../services/product.service";
import Loading from "../Loading/Loading";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [seller, setSeller] = useState({});
  const [currentBidder, setCurrentBidder] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const { user } = useContext(AuthContext);
  const [updatedCurrentPrice, setUpdatedCurrentPrice] = useState(
    product.currentPrice
  );
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
      if(user.buyer) {

        const response = await productService.getSingleProductBuyer(id);
        const { product } = response.data;
        setUpdatedCurrentPrice(product.currentPrice);
      } else {
        const response = await productService.getSingleProductSeller(id);
        const { product } = response.data;
        setUpdatedCurrentPrice(product.currentPrice);
      }
    } catch (error) {
      console.log(error, "error fetching");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUpdatedCurrentPrice();
      setServerMessage("");
    }, 5000); // Fetch updated current price every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  console.log(user)

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
          setServerMessage(error.response.data.message);
        }
        console.error("Error updating bid:", error);
      })
      .finally(setServerMessage(""));
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
        navigate(`/seller/dashboard/${user._id}`);
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
        setCurrentPrice(product.currentPrice)
        setCurrentBidder(currentBidder);
        setSeller(seller);
        setIsLoading(false);
      });
    } else if (user.buyer) {
      productService.getSingleProductBuyer(id).then((response) => {
        const { product, seller, currentBidder } = response.data;
        setProduct(product);
        setCurrentPrice(product.currentPrice);
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
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <h1>{product.productName}</h1>
      <h3>{product.description}</h3>
      <p>Starting price: {product.startingPrice}</p>
      <p>Current price: {updatedCurrentPrice}</p>
      <p>Duration: {product.duration}</p>
      <p>Time left: {product.timer}</p>
      <p>{product.auctionStarted}</p>
      <p>{product.auctionEnded}</p>
      {currentBidder ? (
        <p>Highest bidder: {currentBidder.name}</p>
      ) : (
        <p>No bidders</p>
      )}

      {!user.seller ? (
        <>
          <h4>Seller: {seller.name}</h4>
          <h4>{seller.email}</h4>
          <form onSubmit={handleBid}>
            {serverMessage && <p>{serverMessage}</p>}
            <label>
              Bid:
              <input
                type="number"
                value={currentPrice}
                placeholder={`${product.startingPrice}`}
                onChange={handlePriceChange}
              />
            </label>
            <p>{message}</p>
            <button type="submit">Place a bid</button>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleUpdate}>
            <label>Product name</label>
            <input
              type="text"
              value={updateName}
              placeholder={product.productName}
              onChange={handleNameUpdate}
            />
            <label>Description</label>
            <button onClick={handleDelete}>Delete product</button>
            <input
              type="text"
              value={updateDescription}
              placeholder={product.description}
              onChange={handleDescriptionUpdate}
            />
            <button type="submit">Save changes</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SingleProduct;
