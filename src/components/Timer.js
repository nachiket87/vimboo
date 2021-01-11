import React, { useState, useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft }) => {
  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, setTimeLeft]);

  return (
    <div>
      <h1>Time Left: {timeLeft ? timeLeft : "Time up! Keep going though"}</h1>
    </div>
  );
};
export default Timer;
