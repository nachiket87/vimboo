import React, { useEffect } from "react";
import PropTypes from "prop-types";

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

Timer.propTypes = {
  timeLeft: PropTypes.number,
  setTimeLeft: PropTypes.func,
  gameOver: PropTypes.bool,
};

export default Timer;
