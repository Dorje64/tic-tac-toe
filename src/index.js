import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Then change Square’s render method to show that value
class Square extends React.Component {
  //Constructor initilaized value of state is 1
  constructor() {
    super();
    this.state = {
      value: 1,
    };
  }

//render Square's state value inside the square.
  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

// In Board’s renderSquare method, change the code to pass a value prop to the Square:
class Board extends React.Component {
  //Construtor, initialze the value of Broad's state to array named squares.
  constructor(props) {
    super(props);
    this.state = {
      //And each elements of squares array is null
      squares: Array(9).fill(null),
    };
  }

  //
  handleClick(i) {
    //slice the squares array from broad's state
    const squares = this.state.squares.slice();
    //define clicked/selected squares element with 'X'
    squares[i] = 'X';
    //update states value with new squares array
    this.setState({squares: squares});
  }

  //method to display text/value inside square box
  renderSquare(i) {
  //return DOM
  //set value of Square element with i
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }



  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
