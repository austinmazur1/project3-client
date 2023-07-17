import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";



const SingleProductFetch = ({ url, render }) => {
 const [product, setProduct] = useState(null);
 const [seller, setSeller] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(url)
            const { product, seller } = response.data;
            setProduct(product);
            setSeller(seller);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    };
    fetchData();
    }, [url])
    
    if(loading) {
        return <Loading />
      }
    
      if(error) {
        return <div>Error:{error.message}</div>
      }

      return render(product, seller)
}

export default SingleProductFetch
