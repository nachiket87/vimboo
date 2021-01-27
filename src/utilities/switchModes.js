// switch modes of editor
const switchMode = (editor) => {
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

export default switchMode;
