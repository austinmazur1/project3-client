import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isBuyer, setIsBuyer] = useState(false)
  const [isSeller, setIsSeller] = useState(false)

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // Send a request to the server using axios
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {

          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);

          if(response.data.seller) {
            setIsBuyer(false)
            setIsSeller(true)
          } else {
            setIsSeller(false)
            setIsBuyer(true)
          }
        })
        .catch((error) => {
          // If the response status is 401 (Unauthorized), the token has expired
          if (error.response && error.response.status === 401) {
            removeToken();
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
          } else {
            // Handle other errors as needed
            console.error("Error verifying token:", error);
          }
        });
    } else {
      setIsLoading(false)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      setIsBuyer(false)
      setIsSeller(false)
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    removeToken();
    authenticateUser();
    setIsBuyer(false)
    setIsSeller(false)
    navigate('/login')

  };



  useEffect(() => {
    // Run this code once the AuthProviderWrapper component in the App loads for the first time.
    // This effect runs when the application and the AuthProviderWrapper component load for the first time.
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        isBuyer,
        isSeller
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
