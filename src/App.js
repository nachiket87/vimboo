import React, { useLayoutEffect, useState, useRef } from "react";
import "./App.css";
import switchMode from "./utilities/switchModes";
import Timer from "./components/Timer";
import TopBar from "./components/TopBar";
import Cheatsheet from "./components/Cheatsheet";
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
  const [currentLevel, setCurrentLevel] = useState(0);
  const [size, setSize] = useState([0, 0]);
  const editor = useRef(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (window.innerWidth > 800) {
        setSize("50vw");
      } else {
        setSize("100vw");
      }
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
          setGameOver(true);
        }
      }
    }
  };

  const insertMode = () => {
    switchMode(editor);
  };

  return (
    <>
      <div className="grid mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
          <div>
            <TopBar
              instructions={INSTRUCTIONS[currentLevel]}
              gameOver={gameOver}
              currentLevel={currentLevel}
              score={score}
              editor={editor}
            />
            <Timer gameOver={gameOver} reset={reset} editor={editor} />
            <Cheatsheet editor={editor} />
          </div>
          <div>
            <button
              className="my-1 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              onClick={insertMode}
              display={`${gameOver}`}
            >
              ESC
            </button>
            <button
              className="m-1 p-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              onClick={() => nextLesson()}
              display={`${gameOver}`}
              disabled={currentLevel === INSTRUCTIONS.length - 1 && score === 5}
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
              keyboardHandler="vim"
              name="vimeditor"
              style={{ width: size }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
