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
      <h1 className="text-4xl m-3">
        <span className="font-black text-purple-700">
          {timeLeft ? timeLeft : "Time up! Keep going though"}
        </span>
      </h1>
      <button
        className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
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
