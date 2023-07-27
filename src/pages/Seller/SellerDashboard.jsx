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
    <div class="ml-10 mr-10">
    <div class="lg:flex lg:items-center lg:justify-between ">
  <div class="min-w-0 flex-1">
    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Your dashboard</h2>
    <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
    <div class="mt-2 ml-10 flex items-center text-sm text-gray-500">
  <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clip-rule="evenodd" />
    <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
  </svg>
  You can find all your uploaded products
</div>
    </div>
  </div>
  <div class="mt-5 flex lg:ml-4 lg:mt-0">

    <span class="sm:ml-3">
      <button type="button" class="inline-flex items-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <svg class="-ml-0.5 mr- h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
        </svg>
        <Link to="/seller/new-product">
        Add a product
      </Link>
      </button>
    </span>
  </div>
</div>
    <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <div key={product._id} className="group relative">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="h-full w-full object-contain lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/seller/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.productName}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.description}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </div>
  );
}

export default ProductListPage;
