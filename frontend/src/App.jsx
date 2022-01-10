import React, { Fragment, useState, FC } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <div className="App">
      <Fragment>
        {/* <Dashboard /> */}
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Router>
      </Fragment>
    </div>
  );
};

export default App;
