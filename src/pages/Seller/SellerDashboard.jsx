import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product.service";
import { AuthContext } from "../../context/auth.context";

function ProductListPage() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    productService
      .getAllProductsSeller(user._id)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <h1>Seller dashboard</h1>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <img src={product.imageUrl} alt={product.productName} />
            <h1>{product.productName}</h1>
            <h3>{product.description}</h3>
            <Link to={`/seller/${product._id}`}>
              <button>View product</button>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/seller/new-product">
        <button>Add a product</button>
      </Link>
    </div>
  );
}

export default ProductListPage;
