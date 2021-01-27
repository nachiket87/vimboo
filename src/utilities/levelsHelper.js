const level1and2 = (value) => {
  if (value.action === "remove" && value.lines.includes("%")) {
    return true;
  }
  return false;
};

const level3 = (value) => {
  if (value.action === "remove" && value.lines[0].includes("Waldo")) {
    return true;
  }
  return false;
};

const level4 = () => {
  //console.log(editor.current.editor.session.doc.$lines);
  //console.log(editor.current.editor);
};

export default [level1and2, level1and2, level3, level4];
