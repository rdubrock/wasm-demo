

import React from "react";
import ReactDOM from "react-dom";
import Test from './sudoku.js';


const Index = () => {
  return (
    <div>
      Hello React!
      <Test />
    </div>
  );
};


import('rust-sudoku-solver').then((module) => {
  ReactDOM.render(<Index />, document.getElementById("index"));
});