import React, { useLayoutEffect, useState, useRef } from "react";
import "./App.css";
import switchMode from "./utilities/switchModes";
import Timer from "./components/Timer";
import levelHelpers from "./utilities/levelsHelper";
import data from "./levels.json";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-gruvbox";
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
      setSize([window.innerWidth - 50, window.innerHeight - 50]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const reset = () => {
    setScore(0);
    setGameOver(false);
    setCurrentLevel(currentLevel);
    editor.current.editor.textInput.focus();
  };
  const nextLesson = () => {
    setScore(0);
    setGameOver(false);
    setCurrentLevel(currentLevel + 1);
    editor.current.editor.textInput.focus();
  };
  const prevLesson = () => {
    setScore(0);
    setGameOver(false);
    setCurrentLevel(currentLevel - 1);
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
        setGameOver(true);
        if (currentLevel < 3) nextLesson(); // hard coded to prevent out of bounds of levels
      }
    }
  };

  const insertMode = () => {
    switchMode(editor);
  };

  return (
    <div className="App p-3 m-3">
      <div
        className={`bg-gray-200 rounded-lg p-2 ${hideInstruct ? "hidden" : ""}`}
      >
        {INSTRUCTIONS[currentLevel]}
      </div>
      <button
        className="m-2 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        display={`${gameOver}`}
        onClick={() => setHideInstruct(!hideInstruct)}
      >
        {hideInstruct ? "Show" : "Hide"} Info
      </button>
      <div className="grid place-items-center">
        <h3 className="font-black text-purple-700"> Problem Number: {score}</h3>
        <Timer gameOver={gameOver} reset={reset} />
        <div className="flex flex-auto justify-between">
          <button
            className="m-2 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={insertMode}
            display={`${gameOver}`}
          >
            ESC
          </button>
          <button
            className="m-2 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={() => nextLesson()}
            display={`${gameOver}`}
            disabled={currentLevel === INSTRUCTIONS.length - 1}
          >
            Next Lesson
          </button>
          <button
            className="m-2 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={() => prevLesson()}
            display={`${gameOver}`}
            disabled={currentLevel === 0}
          >
            Prev Lesson
          </button>
        </div>
        <AceEditor
          theme="gruvbox"
          minLines={25}
          ref={editor}
          value={VALUES[currentLevel][score]}
          onChange={(e, v) => change(v)}
          focus={true}
          onLoad={(editor) => editor.gotoLine(0, 0)}
          width={size[0]}
          keyboardHandler="vim"
          name="vimeditor"
        />
      </div>
    </div>
  );
}

export default App;
