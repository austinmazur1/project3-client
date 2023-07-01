import "./LoginPage.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [seller, setSeller] = useState(false);
  const [buyer, setBuyer] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSeller = (e) => {
    if (!seller) {
      setSeller(true);
      setBuyer(false); 
    }
  };
  
  const handleBuyer = (e) => {
    if (!buyer) {
      setBuyer(true);
      setSeller(false); 
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, seller, buyer };

    // Send a request to the server using axios

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

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
            value={seller}
            onChange={handleSeller}
          />
          <label for="seller">Seller</label>
          <input
            type="radio"
            id="buyer"
            name="sellerOrBuyer"
            value={buyer}
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
