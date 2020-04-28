import React from "react";
import Todo from "./components/todo";
import Addtodo from "./components/addtodo";
import Edit from "./components/edit";
import Signup from "./components/signup";
import Login from "./components/login";
import About from "./components/about";
import { Route, Switch, BrowserRouter, Link, Redirect } from "react-router-dom";
import Profile from "./components/profile";

const error = () => {
  return (
    <div>
      <h1>
        page not found<Link to="/"> -go home</Link>
      </h1>
    </div>
  );
};

const PrivateRoute = props => {
  const { history } = props;
  const check = JSON.parse(localStorage.getItem("current-user"));
  return <div>{check ? props.children : <Redirect to="/login" />}</div>;
};

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Signup} exact={true} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <PrivateRoute>
            <Route path="/profile" component={Profile} />
            <Route path="/addtodo" component={Addtodo} />
            <Route path="/todos" component={Todo} />
            <Route path="/edit" component={Edit} />
          </PrivateRoute>
          <Route component={error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
