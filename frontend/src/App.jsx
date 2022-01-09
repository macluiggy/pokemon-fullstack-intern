import React, { Fragment, useState, FC } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  RouteComponentProps,
} from "react-router-dom";

// components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} />
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
                <Register {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              isAuthenticated ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
