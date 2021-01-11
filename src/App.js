import "./App.css";
import Timer from "./components/Timer";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/keybinding-vim";
import { useState } from "react";

const VALUES = [
  `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t%\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
  `\n\n\n%\n\n\n\n\n\n\n\n\n\n\n`,
  `\n%\n\n\n\n\n\n\n\n\n`,
  `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t\t\t%\n\n\n\n\n\n\n\n\n`,
  `\n\n\n\nprint("%")\n\n\n\n\n\n\n\n\n`,
  `\n\n\n\n\t\t\t\t\t\t\t\t\tCongratulations!\n\n\n\n`,
];

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const change = (event, value) => {
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
  const itLoaded = (editor) => {
    editor.focus();
    editor.gotoLine(0, 0);
  };
  return (
    <div className="App">
      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        gameOver={gameOver}
      />
      <div>
        <p>
          A wild <b>'%'</b> is out of control! he keeps popping up everywhere on
          this editor, remove him as fast as you can
        </p>
        <p>
          <b> Tip: </b>there are several ways to navigate and delete a word with
          vim. For this challenge, we recommend you stick to the basics. Use{" "}
          <b>'h'</b> to move left, <b>'j'</b> to move down, <b>'k'</b> to move
          up,<b>'l'</b> to move right
        </p>
        <h3>
          Once you've spotted the wild % put your cursor on it to aim your lazer
          and shoot by pressing <b>'x'</b>
        </h3>
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <AceEditor
          theme="gruvbox"
          minLines={25}
          value={VALUES[score]}
          onChange={(e, v) => change(e, v)}
          height="800px"
          onLoad={itLoaded}
          width={
            window.innerWidth < 400 ? window.innerWidth : window.innerWidth - 50
          }
          keyboardHandler="vim"
          name="vimeditor"
          setOptions={{
            autoScrollEditorIntoView: true,
            scrollPastEnd: true,
            tabSize: 4,
          }}
        />
      </div>
    </div>
  );
}

export default App;
