import React, { useCallback } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/keybinding-vim";

import "./App.css";
import Timer from "./components/Timer";
import switchMode from "./utilities/switchModes";
import levelInfo from "./levels.json";
import levelz from "./utilities/levelsHelper";

import { useEffect, useLayoutEffect, useState, useRef } from "react";

const instructions = levelInfo["instructions"];
const values = levelInfo["levels"];

function App() {
  const [score, setScore] = useState(0);
  const [startTimer, setTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [size, setSize] = useState([0, 0]);
  const editor = useRef(null);

  useEffect(() => {
    setTimer(true);
  }, [editor]);

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
    setTimeLeft(30);
    editor.current.editor.textInput.focus();
  };
  const nextLesson = () => {
    setTimer(false);
    setTimer(true);
    setScore(0);
    setGameOver(false);
    setCurrentLevel(currentLevel + 1);
    setTimeLeft(20);
    editor.current.editor.textInput.focus();
  };
  const change = useCallback(
    (event, value) => {
      const levelChanger = levelz[currentLevel];
      levelChanger(
        event,
        value,
        setScore,
        score,
        timeLeft,
        setGameOver,
        editor
      );
    },
    [editor]
  );

  const startTime = () => {
    setTimer(true);
    editor.current.editor.textInput.focus();
  };
  const insertMode = () => {
    switchMode(editor);
  };

  return (
    <div className="App">
      <div>{instructions[currentLevel]}</div>
      <div style={{ display: "grid", placeItems: "center" }}>
        {startTimer ? (
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            gameOver={gameOver}
          />
        ) : (
          <></>
        )}
        <button onClick={() => reset()}> Reset </button>
        <button onClick={() => nextLesson()}>Next Lesson</button>
        <button onClick={() => startTime()}>Start Timer</button>
        <button onClick={() => insertMode()}>ESC</button>
        <AceEditor
          theme="gruvbox"
          minLines={25}
          ref={editor}
          value={values[currentLevel][score]}
          onChange={(e, v) => change(e, v)}
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
