import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import productService from "../../services/product.service";
import { AuthContext } from "../../context/auth.context";

function ProductListPage() {
  const { user } = useContext(AuthContext)
  // const { userId } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const userId = user && user._id

  console.log("userId", userId)
  
  
  useEffect(() => {
    console.log("userId", userId)
    
    const getAllProducts = async () => {
      try {
        const response = await productService
        .getAllProductsSeller(userId);
        console.log(response.data)
        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
      
      
    }
    getAllProducts();
    
}, [userId])

  // const getAllProducts = async () => {
  //   console.log(userId)
  //   productService
  //     .getAllProductsSeller(userId)
  //     .then((response) => {

  //       console.log(response.data);
  //       setProducts(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // useEffect(() => {
  //   getAllProducts();
    
  // }, []);




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
