import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTask from "./components/create-task.component";
import EditTask from "./components/edit-task.component";
import TasksList from "./components/tasks-list.component";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://reactjs.org" target="_blank">
              <img src={logo} width="30" height="30" alt="reactjs.org/" />
            </a>
            <Link to="/" className="navbar-brand">Tasky App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Tasks</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Task</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={TasksList} />
          <Route path="/edit/:id" component={EditTask} />
          <Route path="/create" component={CreateTask} />
        </div>
      </Router>
    );
  }
}

export default App;