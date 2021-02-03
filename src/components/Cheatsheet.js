/* eslint-disable */
import React, { useEffect } from "react";

const Cheatsheet = (props) => {
  useEffect(() => {
    window.addEventListener("keyup", (k) => {
      const x = document.getElementById(k.key);
      if (!x) return;
      x.classList.add("opacity-25");
      setTimeout(() => {
        x.classList.remove("opacity-25");
      }, 300);
    });
    window.addEventListener("click", () => {
      props.editor.current.editor.textInput.focus();
    });
  }, []);
  return (
    <div className="grid place-items-center">
      <b className="text-xl"> Navigation </b>
      <div className="flex flex-wrap">
        <button
          className="m-2 w-16 h-16 bg-gray-500 my-1 rounded-lg text-center text-sm text-white"
          id="k"
          disabled={true}
        >
          <p>{`^`}</p>k
        </button>
        <button
          className="m-2 w-16 h-16 bg-gray-500 my-1 rounded-lg text-center text-sm text-white"
          id="h"
        >
          {`<`} h
        </button>
        <button
          className="m-2 w-16 h-16 bg-gray-500 my-1 rounded-lg text-center text-sm text-white"
          id="l"
        >
          l {`>`}
        </button>
        <button
          className="m-2 w-16 h-16 bg-gray-500 my-1 rounded-lg text-center text-sm text-white"
          id="j"
        >
          <p>j</p>
          {`˅`}
        </button>
      </div>
      <b>Delete Character under cursor</b>
      <div className="flex flex-wrap">
        <button
          className="m-2 w-16 h-16 bg-gray-500 my-1 rounded-lg text-center text-sm text-white"
          id="x"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Cheatsheet;
