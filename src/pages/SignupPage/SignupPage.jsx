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
  const handleSeller = () => {
    setSeller(true);
    setBuyer(false);
  };

  const handleBuyer = () => {
    setBuyer(true);
    setSeller(false);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Create an object representing the request body
    const requestBody = { email, password, name, seller, buyer };

    // Send a request to the server using axios
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="../AuctionEra Small logo.jpg"
          alt="AuctionEra"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-700">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignupSubmit}>
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
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
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
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={handleName}
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
                value={seller}
                onChange={handleSeller}
                checked={seller}
                className="mr-2"
              />
              <label htmlFor="seller" className="mr-6">
                Seller
              </label>
              <input
                type="radio"
                id="buyer"
                name="sellerOrBuyer"
                value={buyer}
                onChange={handleBuyer}
                checked={buyer}
                className="mr-2"
              />
              <label htmlFor="buyer">Buyer</label>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="mt-4 text-center text-red-600">{errorMessage}</p>}

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold leading-6 text-red-600 hover:text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
