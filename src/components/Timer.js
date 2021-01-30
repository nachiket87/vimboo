import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = ({ gameOver, reset, editor }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [stopTime, setStopTime] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft + 1);
    }, 1000);

    if (gameOver || stopTime) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, setTimeLeft, gameOver, stopTime]);

  return (
    <div>
      <div className="flex justify-between md:p-0 md:m-0 sm:justify-center">
        <button
          className="p-1 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => {
            setTimeLeft(0);
            setStopTime(false);
            reset();
          }}
        >
          Restart
        </button>
        <h1 className="text-4xl m-3">
          <span className="font-black text-purple-700">{timeLeft}</span>
        </h1>
        <button
          className="p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => {
            setStopTime(true);
            editor.current.editor.textInput.focus();
          }}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

Timer.propTypes = {
  timeLeft: PropTypes.number,
  setTimeLeft: PropTypes.func,
  gameOver: PropTypes.bool,
  editor: PropTypes.object,
  reset: PropTypes.func,
};
export default Timer;
