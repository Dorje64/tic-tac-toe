import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Square conmponent to show that value in square
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// In Board’s renderSquare method, change the code to pass a value prop to the Square:
class Board extends React.Component {
  //Construtor, initialze the value of Broad's state to array named squares.
  constructor(props) {
    super(props);
    this.state = {
      //And each elements of squares array is null
      squares: Array(9).fill(null),
      isNext: true,
    };
  }

  //
  handleClick(i) {
    //slice the squares array from broad's state
    const squares = this.state.squares.slice();
    //define clicked/selected squares element with 'X'
    squares[i] = this.state.isNext ? 'X' : 'O';
    //update states value with new squares array
    this.setState({squares: squares, isNext: !this.state.isNext}); //setState is to call modify the state
  }

  //method to display text/value inside square box
  renderSquare(i) {
  //return DOM
  //set value of Square element with i
    return (
      //this is the props for the Square Component
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.isNext ? 'X' : 'O');

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
