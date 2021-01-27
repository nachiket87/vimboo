const level1and2 = ({ value }) => {
  return value.action === "remove" && value.lines.includes("%");
};

const level3 = ({ value }) => {
  return value.action === "remove" && value.lines[0].includes("Waldo");
};

const level4 = ({ editor, score }) => {
  const answers = [
    { end: { row: 5, column: 20 }, start: { row: 5, column: 9 } },
    { end: { row: 4, column: 24 }, start: { row: 4, column: 13 } },
    { end: { row: 2, column: 18 }, start: { row: 2, column: 7 } },
    { end: { row: 5, column: 20 }, start: { row: 5, column: 9 } },
    { end: { row: 5, column: 20 }, start: { row: 5, column: 9 } },
  ];
  const content = editor.current.editor.session.getTextRange(answers[score]);
  console.log(content);
  return content === "Hello World";
};

export default [level1and2, level1and2, level3, level4];
