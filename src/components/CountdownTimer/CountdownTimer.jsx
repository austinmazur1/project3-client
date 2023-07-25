import React, { useState, useEffect } from "react";
import axios from "axios";

const CountdownTimer = ({ productId, timer, handleWinner }) => {
  // const storedRemainingTime = localStorage.getItem(
  //   `product_${productId}_remainingTime`
  // );
  // const [remainingTime, setRemainingTime] = useState(
  //   storedRemainingTime ? Number(storedRemainingTime) : timer
  // );

  // useEffect(() => {
  //   // Save the remaining time in localStorage whenever it changes
  //   localStorage.setItem(
  //     `product_${productId}_remainingTime`,
  //     remainingTime.toString()
  //   );

  //   if (remainingTime === 0) {
  //     handleWinner()
  //   }
  // }, [productId, remainingTime]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setRemainingTime((prevRemainingTime) =>
  //       prevRemainingTime > 0 ? prevRemainingTime - 1 : 0
  //     );
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [productId]);
  const [expirationDate, setExpirationDate] = useState(0);
  const [countdown, setCountdown] = useState(0);
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
  }, []);

  setInterval(function () {
    const date = new Date().getTime();
    // const result = Math.max(expirationDate - date, 0)
    const result = expirationDate - date;
    setCountdown(result);
  }, 1000);

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
};

export default CountdownTimer;
