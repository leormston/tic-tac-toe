import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub, faLinkedin)
function Square(props) {
  return (
    <button className = "square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}

class Board extends React.Component {




  renderSquare(i) {
    return (
      <Square
        value= {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
    />
  );
  }

  render() {
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

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,

    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
      'Revert to move ' + move :
      'Restart Game'
      if (move == 9)
      {
        return;
      }
      return (
          <p><button onClick={() => this.jumpTo(move)}>{desc}</button></p>
      );
    });
    let status;
    if (winner) {
      if (winner == 'X')
      status = <h2>{'CROSSES HAVE WON THE GAME!'}</h2>
      else
      status = <h2>{'NAUGHTS HAVE WON THE GAME!'}</h2>
    } else {
      status = <h2>{(this.state.xIsNext ? 'CROSSES MOVE' : 'NAUGHTS MOVE')}</h2>;
    }
    return (

      <div className="game">
        <Row>
        <Col id='navheader'><h1>Tic Tac Toe</h1></Col>
        </Row>

        <Container>
          <Row>
            <Col m={8}>
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            </Col>
            <Col m={4}>
            <div className="game-info">
              <div>{status}</div>
              <p>{moves}</p>
            </div>
            </Col>
          </Row>
        </Container >
        <div id='footer'>
          <Row>
          <Col m={3} ><h5>Designed By Louie Ormston</h5></Col>
          <Col m={9} id = "links">
            <h6> See more of what I've done </h6>
            <p><a href="https://github.com/leormston"><FontAwesomeIcon icon={["fab", "github"]} /> - My Github</a></p>
            <p><a href="https://www.linkedin.com/in/louie-ormston-48810a150/"><FontAwesomeIcon icon={["fab", "linkedin"]} /> - My LinkedIn</a></p>
          </Col>
          </Row>
        </div>
      </div>

    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
