import React from "react";
import "./styles.scss";

export default class App extends React.Component {
  state = {
    cellStates: new Array(36).fill(false),
    score: 0,
    gameStarted: false
  };

  stopGame = () => {
    alert("Your final score is " + this.state.score);
    this.setState({
      cellStates: new Array(36).fill(false),
      gameStarted: false,
      score: 0
    });
  };

  selectRandomCell = () => {
    const randomIndex = this.getMagicNumber();
    this.setState({
      cellStates: this.state.cellStates.map(
        (value, idx) => idx === randomIndex
      ),
      gameStarted: true
    });
  };

  validateClick = cellIndex => {
    const { cellStates } = this.state;
    if (cellStates[cellIndex]) {
      this.setState({ score: this.state.score + 1 }, () => {
        this.selectRandomCell();
      });
    } else {
      this.setState({ score: Math.max(this.state.score - 1, 0) });
    }
  };

  getMagicNumber = () => {
    return Math.floor(Math.random() * Math.floor(36));
  };

  render() {
    const { score, cellStates, gameStarted } = this.state;
    const renderCells = () => {
      return cellStates.map((isSelected, idx) => {
        return (
          <span
            key={idx}
            className={"cell " + (isSelected ? "active" : "")}
            onClick={this.validateClick.bind(this, idx)}
          />
        );
      });
    };

    return (
      <div className="App">
        <div id="game-container">
          <div className="header">
            <h4>Hit The Circle</h4>
            <div>Test your skill how many circles you can hit?</div>
            <p>
              Score <span className="game-score">{score}</span>
            </p>
          </div>
          <div className="board">
            <div className="cells-container">{renderCells()}</div>
          </div>
          <div className="controls">
            <button
              className="play-btn"
              onClick={this.selectRandomCell}
              disabled={gameStarted}
            >
              Play
            </button>
            <button
              className="stop-btn"
              onClick={this.stopGame}
              disabled={!gameStarted}
            >
              Stop
            </button>
          </div>
          <div className="instructions">
            Instruction :
            <ol>
              <li>
                Click on the circles as they are selected randomly by the
                computer
              </li>
              <li>1 point per hit, minus 1 per miss.</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
