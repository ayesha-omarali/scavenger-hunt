import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TaskPage from './TaskPage';

// ReactDOM.render(<App />, document.getElementById('root'));

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Sign Into Team</Link>
        </li>
        <li>
          <Link to="/taskpage">Task Pages</Link>
        </li>
        <li>
          <Link to="/tbd">tbd</Link>
        </li>
      </ul>
      <Route path="/" component={App} />
      <Route path="/taskpage" component={TaskPage} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
