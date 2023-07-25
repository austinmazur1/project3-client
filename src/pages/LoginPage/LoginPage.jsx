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

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

    if (!seller && !buyer) {
      setErrorMessage("Please select an account type (Seller or Buyer)");
      return;
    }

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
        } else {
          navigate('/buyer/dashboard')

        authenticateUser();

        if (seller) {
          navigate("/seller/dashboard");
        } else if (buyer) {
          navigate("/buyer/dashboard");

        }
      })
      .catch((error) => {
        console.log("error", error);
        setErrorMessage("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="AuctionEra Small logo.jpg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-700">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleEmail}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-red-700 hover:text-red-600">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="seller" className="block text-sm font-medium leading-6 text-gray-900">
              Account type:
            </label>
            <div className="mt-2">
              <input
                type="radio"
                id="seller"
                name="sellerOrBuyer"
                value={true}
                checked={seller}
                onChange={handleSeller}
              />
              <label htmlFor="seller" className="mr-6">
                Seller
              </label>
              <input
                type="radio"
                id="buyer"
                name="sellerOrBuyer"
                value={true}
                checked={buyer}
                onChange={handleBuyer}
              />
              <label htmlFor="buyer">Buyer</label>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-center text-red-600">{errorMessage}</p>}

       
      </div>
    </div>
  );
}

export default LoginPage;
