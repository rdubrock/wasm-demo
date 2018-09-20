import React from 'react';
const sudoku = import('rust-sudoku-solver');
import solver from 'js-brute-force-sudoku';

export default class Test extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.solveWithWasm = this.solveWithWasm.bind(this);
    this.solveWithJS = this.solveWithJS.bind(this);
  }

  solveWithWasm() {
    sudoku.then((module) => {
      let start = performance.now()
      let solution = module.solve_string(this.state.string);
      let end = performance.now();
      this.setState({
        solution,
        time: (end - start).toFixed(2),
      });
    });
  }

  solveWithJS() {
    let start = performance.now() ;
    let solution = solver(this.state.string);
    let end = performance.now();
    this.setState({
      solution,
      time: (end - start).toFixed(2),
    });
  }

  handleChange(e) {
    this.setState({
      string: e.target.value,
    });
  }

  printBoard() {
    const { solution } = this.state;
    if (!solution) {
      return '';
    }
    const divider = <p style={ { margin: 0 } }>--------------------------------</p>
    return solution.toString().split('').map((char, index) => {
      let el = <span>{`${char} | `}</span>
      if(index % 9 === 0) {
        return [divider, el];
      }
      return el;
    });
  }

  render() {
    return (
      <div>
        <div>
          Medium puzzle: 1...9...2735..........4..5..5.....63.....61...8.1.....8..5.72....4.....1...2..73.
        </div>
        <div>
          Hardest in the WORLD: 8..........36......7..9.2...5...7.......457.....1...3...1....68..85...1..9....4..
        </div>
        <input
          onChange={ this.handleChange }
        />
        <button onClick={ this.solveWithWasm }>Solve with wasm!</button>
        <button onClick={ this.solveWithJS }>Solve with JS!</button>
        <div>
          { `Solved in ${this.state.time}ms`}
        </div>
        <div>
          { this.printBoard(this.state.solution) }
        </div>
      </div>
    )
  }
}
