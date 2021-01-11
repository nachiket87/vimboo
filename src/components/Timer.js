import React, { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft, gameOver }) => {
  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (gameOver) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, setTimeLeft, gameOver]);

  return (
    <div>
      <h1>Time Left: {timeLeft ? timeLeft : "Time up! Keep going though"}</h1>
    </div>
  );
};
export default Timer;
