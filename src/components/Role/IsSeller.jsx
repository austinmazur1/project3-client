import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
// import Loading from "../Loading/Loading";

function IsSeller({ children }) {
  const { isSeller, isBuyer, isLoggedIn } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isSeller) {
    return children
  } else if(isBuyer) {
    return <Navigate to="/buyer/dashboard" />
  }
}

export default IsSeller;
