import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

const ProductFetchSeller = ({ url, render, userId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Include the userId in the request headers
        const response = await axios.get(url, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
           },
        }
        );
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error:{error.message}</div>;
  }

  return <>{product.map((product) => render(product))}</>;
};

export default ProductFetchSeller;