import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TaskPage from './TaskPage';
import GameContainer from './GameContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/taskpage">
          <TaskPage />
        </Route>

        <Route path="/game">
          <GameContainer />
        </Route>

        <Route path="/">
          <App />
        </Route>
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
