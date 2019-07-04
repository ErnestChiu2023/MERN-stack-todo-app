import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTodo from "./components/CreateToDo";
import TodoList from "./components/TodosList";
import EditTodo from "./components/EditTodo";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              MERN-Stack Todo App
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Todos
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Create Todo
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          {/*Make sure that the component is always spelled with a lower case c because if it isn't it will not render correctly*/}
          <Route path="/" exact component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <br />
        </div>
      </Router>
    );
  }
}

export default App;
