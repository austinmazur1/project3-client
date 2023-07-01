import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [seller, setSeller] = useState(false);
  const [buyer, setBuyer] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, seller, buyer };
console.log(requestBody)
    // Send a request to the server using axios

    const authToken = localStorage.getItem("authToken");
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, requestBody, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Account type:</label>
        <div>
          <input type="radio" id="seller" name="sellerOrBuyer" value={seller} onChange={handleSeller}/>
          <label for="seller">Seller</label>
          <input type="radio" id="buyer" name="sellerOrBuyer" value={buyer} onChange={handleBuyer}/>
          <label for="buyer">Buyer</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
