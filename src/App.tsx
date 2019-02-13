import "./App.css";

import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Home from "./home/home";
import StopwatchContainer from "./stopwatch/stopwatch.container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Switch>
              <Route path="/stopwatch" component={StopwatchContainer} />
              <Route component={Home} />
            </Switch>
            <Link to="/stopwatch">Stopwatch</Link>
            <br />
            <Link to="/">Home</Link>
          </header>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
