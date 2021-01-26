const level1and2 = (
  event,
  value,
  setScore,
  score,
  timeLeft,
  setGameOver,
  editor
) => {
  console.log(event);
  if (value.action === "remove" && value.lines.includes("%")) {
    win(setScore, score, timeLeft, setGameOver);
  }
};

const level3 = (event, value, setScore, score, timeLeft, setGameOver) => {
  if (value.action === "remove" && value.lines[0].includes("Waldo")) {
    console.log(event);
    win(setScore, score, timeLeft, setGameOver);
  }
};

const level4 = (
  event,
  value,
  setScore,
  score,
  timeLeft,
  setGameOver,
  editor
) => {
  console.log(editor.current.editor.session.doc.$lines);
  console.log(editor.current.editor);
};

const win = (setScore, score, timeLeft, setGameOver) => {
  setScore(score + 1);
  if (score + 1 === 5) {
    if (timeLeft <= 0) {
      alert("Game Over! You didn't finish in time but you finished!");
    } else {
      alert("Congratulations! You completed the mission in time!");
    }
    setGameOver(true);
  }
};

export default [level1and2, level1and2, level3, level4];
