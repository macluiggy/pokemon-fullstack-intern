import React, { Fragment, useState, FC, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { proxy } from "./config";
// components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();d
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  // const isAuth = async () => {
  //   try {
  //     const response = await fetch(`${proxy}/auth/is-verify`, {
  //       method: "GET",
  //       headers: { token: localStorage.token },
  //     });
  //     const parseRes = await response.json();
  //     console.log(parseRes);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  useEffect(() => {
    // isAuth();
  }, []);
  return (
    <div className="App">
      <Fragment>
        <h1> hello </h1>
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
