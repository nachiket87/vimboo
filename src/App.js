import "./App.css";
import Timer from "./components/Timer";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/keybinding-vim";
import { useState } from "react";

const VALUES = [
  `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\tnachiket\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`,
  `\n\n\nnachiket\n\n\n\n\n\n\n\n\n\n\n`,
  `\nnachiket\n\n\n\n\n\n\n\n\n`,
  `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t\t\tnachiket\n\n\n\n\n\n\n\n\n`,
  `\n\n\n\nprint("nachiket")\n\n\n\n\n\n\n\n\n`,
];

function App() {
  const [score, setScore] = useState(0);

  const change = (event, value) => {
    if (value.action === "remove") {
      if (value.lines.includes("nachiket")) {
        setScore(score + 1);
        if (score + 1 === 5) {
          alert("Game Over");
          return;
        }
      }
    }
  };
  const itLoaded = (editor) => {
    editor.focus();
    editor.gotoLine(0, 0);
  };
  return (
    <div className="App">
      <Timer />
      <div>
        <p>
          Nachiket is out of control! he keeps popping up everywhere on this
          editor, remove him as fast as you can
        </p>
        <p>
          <b> Tip: </b>there are several ways to navigate and delete a word with
          vim. For this challenge, we recommend you stick to the basics. Use{" "}
          <b>'h'</b> to move left, <b>'j'</b> to move down, <b>'k'</b> to move
          up,<b>'l'</b> to move right
        </p>
        <p>
          Once you're on the first letter on the word type <b>'d' + 'w'</b>.
          This means 'delete word'{" "}
        </p>
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <AceEditor
          theme="gruvbox"
          minLines={25}
          value={VALUES[score]}
          debounceChangePeriod={1000}
          onChange={(e, v) => change(e, v)}
          height="800px"
          onLoad={itLoaded}
          width="1200px"
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
