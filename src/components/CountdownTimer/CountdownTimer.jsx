import React, { useState, useEffect } from "react";
import axios from "axios";
import productService from "../../services/product.service";
const CountdownTimer = ({ productId, timer, handleWinner }) => {

  const [expirationDate, setExpirationDate] = useState(0);
  const [countdown, setCountdown] = useState(0);

  let intervalId;
  
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get("http://localhost:5005/seller/" + productId, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const expirationDateInMilliseconds =
          res.data.expirationDateInMilliseconds;
        setExpirationDate(expirationDateInMilliseconds);
      });

      return () => {
        clearInterval(intervalId)
      }
  }, [productId]);

  // setInterval(function () {
  //   const date = new Date().getTime();
  //   // const result = Math.max(expirationDate - date, 0)
  //   const result = expirationDate - date;
  //   setCountdown(result);
  // }, 1000);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date().getTime();
      const result = expirationDate - date;
      setCountdown(result);
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, [expirationDate]);

  useEffect(() => {
    if (countdown <= 0) {
      handleWinner();
      console.log('done')
    }
  }, [countdown]);


  // const handleWinner = () => {
  //   console.log('you won');
  //   // Send user an email?
  //   productService
  //     .updateWinner(productId, currentBidder)
  //     .then(() => {
  //       // Handle any other logic when the winner is updated
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }
      
    

  const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${days}d ${hours
      .toString()
      .padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds
      .toString()
      .padStart(2, "0")}s`;
    return formattedTime;
  };

  return (
    <div>
      <p>{countdown > 0 ? formatTime(countdown) : "Product expired"}</p>
    </div>
  );
  }


export default CountdownTimer;
