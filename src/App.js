import React, { useLayoutEffect, useState, useRef } from "react";
import "./App.css";
import Timer from "./components/Timer";
import data from "./levels.json";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-gruvbox";
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
      setSize([window.innerWidth - 50, window.innerHeight - 50]);
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
  const change = (event, value) => {
    console.log(event);
    if (value.action === "remove" && value.lines.includes("%")) {
      setScore(score + 1);
      if (score + 1 === 5) {
        alert("Congratulations!");
        setGameOver(true);
        nextLesson();
      }
    }
  };

  return (
    <div className="App">
      <div>{INSTRUCTIONS[currentLevel]}</div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <Timer gameOver={gameOver} reset={reset} />
        <button onClick={() => nextLesson()} display={gameOver}>
          Next Lesson
        </button>
        <button onClick={() => prevLesson()} display={gameOver}>
          Prev Lesson
        </button>
        <AceEditor
          theme="gruvbox"
          minLines={25}
          ref={editor}
          value={VALUES[currentLevel][score]}
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
