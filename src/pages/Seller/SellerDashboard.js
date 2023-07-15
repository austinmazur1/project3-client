import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
 
 
function ProductListPage() {
  const [products, setProducts] = useState([]);
 
  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/seller/dashboard`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    getAllProducts();
  }, [] );
 
  
  return (
    <div>
      <h1>Seller dashboard</h1>
        {products.map((product) => {
          return (
            <div  key={product._id} >
              <h3>{product.name}</h3>
              {console.log("hello", product.name)}
            </div>
          );
        })}     
        <Link to="/seller/new-product">
            <button>Add a product</button>
          </Link>
    </div>
  );
}
 
export default ProductListPage;