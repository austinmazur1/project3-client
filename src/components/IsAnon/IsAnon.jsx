import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading, isBuyer, isSeller } = useContext(AuthContext);


  // If the authentication is still loading ⏳
  if (isLoading) {
    return <Loading />;
  }

  if (isLoggedIn && isBuyer) {
    // If the user is logged in, navigate to home page ❌
    return <Navigate to="/buyer/dashboard" />;
  } else if (isLoggedIn && isSeller) {
    return <Navigate to="/seller/dashboard" />;
  }

  // If the user is not logged in, allow to see the page ✅
  return children;
}

export default IsAnon;
