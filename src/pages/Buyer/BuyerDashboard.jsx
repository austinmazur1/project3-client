import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product.service";
import { AuthContext } from "../../context/auth.context";

function BuyerDashboard() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    productService
      .getAllProductsBuyer(user._id)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const isCountdownExpired = (expirationDate) => {
    const currentData = new Date().getTime();
    return expirationDate <= currentData;
  };

  const activeProducts = products.filter(
    (product) => !product.sold && !product.auctionEnded
  );


  return (
    <div>
      <h1>Buyer dashboard</h1>
      <div>
        {activeProducts.map((product) => (
          <div key={product._id}>
            <img src={product.imageUrl} alt={product.productName} />
            <h1>{product.productName}</h1>
            <h3>{product.description}</h3>
            <Link to={`/buyer/${product._id}`}>
              <button>View product</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerDashboard;
