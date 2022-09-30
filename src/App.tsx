import "./App.css";

import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Home from "./home/home";
import StopwatchContainer from "./stopwatch/stopwatch.container";
import { GameOfLife } from "./game-of-life/game-of-life.container";
import { Sudoku } from "./sudoku/sudoku.container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Switch>
              <Route path="/stopwatch" component={StopwatchContainer} />
              <Route path="/game-of-life" component={GameOfLife} />
              <Route path="/sudoku" component={Sudoku} />
              <Route component={Home} />
            </Switch>
            <Link to="/stopwatch">Stopwatch</Link>
            <br />
            <Link to="/game-of-life">game of life</Link>
            <br />
            <Link to="/sudoku">sudoku</Link>
            <br />
            <Link to="/">Home</Link>
          </header>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
