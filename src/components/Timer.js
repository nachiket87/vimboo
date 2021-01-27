import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ gameOver, reset }) => {
  const [timeLeft, setTimeLeft] = useState(10);
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
      <button
        onClick={() => {
          setTimeLeft(30);
          reset();
        }}
      >
        Restart Level
      </button>
    </div>
  );
};

Timer.propTypes = {
  timeLeft: PropTypes.number,
  setTimeLeft: PropTypes.func,
  gameOver: PropTypes.bool,
  reset: PropTypes.func,
};
export default Timer;
