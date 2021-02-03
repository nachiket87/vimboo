import React, { useState } from "react";
import PropTypes from "prop-types";

const TopBar = ({ instructions, gameOver, currentLevel, score }) => {
  const [hideInstruct, setHideInstruct] = useState(false);

  return (
    <div className="App md:px-3 sm:p-0 sm:m-0">
      <div
        className={`bg-gray-200 rounded-lg p-2 ${hideInstruct ? "hidden" : ""}`}
      >
        {instructions}
        <p>
          <b>
            {`Remember - You can always undo mistakes by pressing ESC followed by 'u'`}
          </b>
        </p>
      </div>
      <button
        className="m-2 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        display={`${gameOver}`}
        onClick={() => setHideInstruct(!hideInstruct)}
      >
        {hideInstruct ? "Show" : "Hide"} Info
      </button>
      <div className="grid">
        <h3 className="font-black text-purple-700">
          {" "}
          Level: {currentLevel + 1}
        </h3>
        <h3 className="font-black text-purple-700"> Problem Number: {score}</h3>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  instructions: PropTypes.string,
  gameOver: PropTypes.bool,
  currentLevel: PropTypes.number,
  score: PropTypes.number,
};

export default TopBar;
