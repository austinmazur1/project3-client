import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductFetchSeller from "../../components/containers/ProductFetchSeller";
 
 
function ProductListPage() {
 /* const [products, setProducts] = useState([]);
 
  const getAllProducts = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/seller/dashboard`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };
 
  useEffect(() => {
    getAllProducts();
  }, [] );*/

    const renderProduct = (product) => {
      return (
        <div key={product._id}>
                <h1>{product.productName}</h1>
                <p>{product.description}</p>
                <Link to={`/seller/${product._id}`}>
                    <button>View product</button>
                </Link>
            </div>
      )
    }
 

  
  return (
    <div>
      <h1>Seller dashboard</h1>

      <ProductFetchSeller  url={`${process.env.REACT_APP_SERVER_URL}/seller/dashboard`} render={renderProduct} />

        <Link to="/seller/new-product">
            <button>Add a product</button>
          </Link>
    </div>
  );
}
 
export default ProductListPage;