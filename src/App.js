import "./App.css";
import Timer from "./components/Timer";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/keybinding-vim";
import { useLayoutEffect, useState, useRef } from "react";

const INSTRUCTIONS = [
  ` A wild '%' is out of control! he keeps popping up everywhere on
          this editor, remove him as fast as you can
           Tip: there are several ways to navigate and delete a word with
          vim. For this challenge, we recommend you stick to the basics. Use
          'h' to move left, 'j' to move down, 'k' to move
          up,'l' to move right
          Once you've spotted the wild % put your cursor on it to aim your lazer
          and shoot by pressing 'x'
  `,
  ` Time to get faster! 
        You can type : followed by line number to take the cursor directly to the line you want to go to
        You can also go to the end of each word by typing 'E' `,
];

const VALUES = [
  [
    `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t%\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
    `\n\n\n%\n\n\n\n\n\n\n\n\n\n\n`,
    `\n%\n\n\n\n\n\n\n\n\n`,
    `\t\t\t\t\t\t%\n\n\n\n\n\n\n\n\n`,
    `\n\n\n\nprint("%")\n\n\n\n\n\n\n\n\n`,
    `\n\n\n\n\t\t\t\t\t\t\t\t\tCongratulations!\n\n\n\n`,
  ],
  [
    `\n\n\n\n\nprint("%")\n\n\n\n\n\n\n\n\n`,
    `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t%\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
    `\n%\n\n\n\n\n\n\n\n\n`,
    `\n\n\n%\n\n\n\n\n\n\n\n\n\n\n`,
    `\n\n\n\t\t\t\t\t\t\t\t\t%\n\n\n\n\n\n\n\n\n`,
    `\n\n\n\nprint("%")\n\n\n\n\n\n\n\n\n`,
  ],
];

function App() {
  const [score, setScore] = useState(0);
  const [startTimer, setTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
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
    setTimeLeft(30);
    editor.current.editor.textInput.focus();
    console.log(editor.current.editor.session);
  };
  const nextLesson = () => {
    setTimer(false);
    setScore(0);
    setGameOver(false);
    setCurrentLevel(currentLevel + 1);
    setTimeLeft(20);
    editor.current.editor.textInput.focus();
  };
  const change = (event, value) => {
    console.log(event);
    if (value.action === "remove" && value.lines.includes("%")) {
      setScore(score + 1);
      if (score + 1 === 5) {
        if (timeLeft <= 0) {
          alert("Game Over! You didn't finish in time but you finished!");
        } else {
          alert("Congratulations! You killed the % in time!");
        }
        setGameOver(true);
      }
    }
  };

  const startTime = () => {
    setTimer(true);
    editor.current.editor.textInput.focus();
  };
  const insertMode = () => {
    console.log(
      editor.current.editor.container.className.includes("normal-mode")
    );
    if (editor.current.editor.container.className.includes("normal-mode")) {
      editor.current.editor.container.className.includes("normal-mode");
      editor.current.editor.container.className = editor.current.editor.container.className.replace(
        "normal-mode",
        ""
      );
    } else {
      editor.current.editor.container.className =
        editor.current.editor.container.className + " normal-mode";
    }
    editor.current.editor.state.cm.state.vim.insertMode = !editor.current.editor
      .state.cm.state.vim.insertMode;
    editor.current.editor.textInput.focus();
  };

  return (
    <div className="App">
      <div>{INSTRUCTIONS[currentLevel]}</div>
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
