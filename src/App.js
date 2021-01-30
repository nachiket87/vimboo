import React, { useLayoutEffect, useState, useRef } from "react";
import "./App.css";
import switchMode from "./utilities/switchModes";
import Timer from "./components/Timer";
import levelHelpers from "./utilities/levelsHelper";
import data from "./levels.json";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/keybinding-vim";

const INSTRUCTIONS = data["instructions"];
const VALUES = data["levels"];

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hideInstruct, setHideInstruct] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [size, setSize] = useState([0, 0]);
  const editor = useRef(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      let addMorePad = 0;
      if (window.innerWidth > 800) addMorePad = 50;
      setSize([window.innerWidth - addMorePad, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const reset = () => {
    setScore(0);
    setGameOver(false);
    editor.current.editor.textInput.focus();
  };
  const nextLesson = () => {
    if (score < 5) {
      setScore(score + 1);
    } else {
      setScore(0);
      setCurrentLevel(currentLevel + 1);
    }
    setGameOver(false);
    editor.current.editor.textInput.focus();
  };
  const prevLesson = () => {
    if (score === 0) {
      setCurrentLevel(currentLevel - 1);
      setScore(4);
    } else {
      setScore(score - 1);
    }
    setGameOver(false);
    editor.current.editor.textInput.focus();
  };
  const change = (value) => {
    if (
      levelHelpers[currentLevel]({
        value: value,
        editor: editor,
        score: score,
      })
    ) {
      setScore(score + 1);
      if (score + 1 === 5) {
        alert("Level Complete!");
        if (currentLevel < 3) {
          setScore(0);
          setCurrentLevel(currentLevel + 1);
        } else {
          alert("Game over!");
        }
        setGameOver(true);
      }
    }
  };

  const insertMode = () => {
    switchMode(editor);
  };

  return (
    <>
      <div className="App md:p-3 md:m-3 sm:p-0 sm:m-0">
        <div
          className={`bg-gray-200 rounded-lg p-2 ${
            hideInstruct ? "hidden" : ""
          }`}
        >
          {INSTRUCTIONS[currentLevel]}
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
          <h3 className="font-black text-purple-700">
            {" "}
            Problem Number: {score}
          </h3>
          <Timer gameOver={gameOver} reset={reset} editor={editor} />
          <div className="flex flex-auto justify-between sm:p-0 sm:m-0">
            <button
              className="my-1 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              onClick={insertMode}
              display={`${gameOver}`}
            >
              ESC
            </button>
            <div>
              <button
                className="m-1 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                onClick={() => nextLesson()}
                display={`${gameOver}`}
                disabled={
                  currentLevel === INSTRUCTIONS.length - 1 && score === 5
                }
              >
                Next
              </button>
              <button
                className="m-1 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                onClick={() => prevLesson()}
                display={`${gameOver}`}
                disabled={currentLevel === 0 && score === 0}
              >
                Previous
              </button>
            </div>
          </div>
          <AceEditor
            theme="solarized_light"
            minLines={25}
            ref={editor}
            wrapEnabled={true}
            value={VALUES[currentLevel][score]}
            onChange={(e, v) => change(v)}
            fontSize={16}
            focus={true}
            onLoad={(editor) => editor.gotoLine(0, 0)}
            width={size[0]}
            keyboardHandler="vim"
            name="vimeditor"
          />
        </div>
      </div>
    </>
  );
}

export default App;
