import "./LoginPage.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [seller, setSeller] = useState(false);
  const [buyer, setBuyer] = useState(false);
  const { user } = useContext(AuthContext);
  const { setUserId } = useContext(AuthContext)
  const { userId } = useContext(AuthContext)

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSeller = (e) => {
    setSeller(e.target.checked);
    setBuyer(false);
  };

  const handleBuyer = (e) => {
    setBuyer(e.target.checked);
    setSeller(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if(!seller && !buyer) {
      setErrorMessage("Please select an account type (Seller or Buyer)");
      return; 
    };

    const requestBody = { email, password, seller, buyer };

    // Send a request to the server using axios

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        console.log("Data response", response);
        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser()
        console.log(seller)
        if(seller) {
          navigate('/seller/dashboard')
        } else if (buyer) {
          navigate('/buyer/dashboard')
        }
      })
      .catch((error) => {
        // const errorDescription = error.response.data.message;
        // setErrorMessage(errorDescription);
        console.log("error", error);
        setErrorMessage("Invalid credentials. Please try again.")
      });
  };

  // useEffect(() => {
  //   // If user is not null, it means authentication is complete,
  //   // and we can navigate to the dashboard based on the selected account type
  //   console.log(seller)
  //   console.log(buyer)
  //     if (seller) {
  //       navigate("/seller/dashboard");
  //     } else if (buyer) {
  //       navigate("/buyer/dashboard");
  //     }
  // }, [seller, buyer]);


  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Account type:</label>
        <div>
          <input
            type="radio"
            id="seller"
            name="sellerOrBuyer"
            value={true}
            checked={seller}
            onChange={handleSeller}
          />
          <label for="seller">Seller</label>
          <input
            type="radio"
            id="buyer"
            name="sellerOrBuyer"
            value={true}
            checked={buyer}
            onChange={handleBuyer}
          />
          <label for="buyer">Buyer</label>
        </div>

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
