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
      
        {products.map((product) => {
          return (
            <div  key={product._id} >
              <h3>{product.name}</h3>
            </div>
          );
        })}     
       
    </div>
  );
}
 
export default ProductListPage;