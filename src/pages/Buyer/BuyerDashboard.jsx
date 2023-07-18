// import { useState, useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import ProductFetch from "../../components/containers/ProductFetch";
 
 

const BuyerDashboard = () => {

    const renderProduct = (product) => {
        return (
            <div key={product._id}>
              <img src={product.imageUrl} alt="product" width='200' />
                <h1>{product.productName}</h1>
                <p>{product.description}</p>
                <Link to={`/buyer/${product._id}`}>
                    <button>View product</button>
                </Link>
            </div>
        );
    };

  return (
    <div>
      <ProductFetch url={`${process.env.REACT_APP_SERVER_URL}/buyer/dashboard`} render={renderProduct} />
    </div>
  )
}

export default BuyerDashboard
