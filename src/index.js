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
  // //Construtor, initialze the value of Broad's state to array named squares.
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     //And each elements of squares array is null
  //     squares: Array(9).fill(null),
  //     isNext: true,
  //   };
  // }

  //method to display text/value inside square box
  renderSquare(i) {
  //return DOM
  //set value of Square element with i
    return (
      //this is the props for the Square Component
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const status = 'Next player: ' + (this.state.isNext ? 'X' : 'O');
    // const winner = calculateWinner(this.props.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
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
  constructor(props) {
  super(props);
  this.state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    xIsNext: true,
    stepNumber: 0,
    };
  }

  handleClick(i) {
    //slice the squares array from broad's state
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    //if winner is declare or square is clicked before then disable to click.
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    //define clicked/selected squares element with 'X'
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    //update states value with new squares array and update isNext
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
    //setState is to call modify the state
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0, //if step is odd xIsNext is set to false esle true
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move :'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

    return (
      <div className="game">
        <div className="game-board">
          <Board
           squares={current.squares}
           onClick={(i) => this.handleClick(i)}
           />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
