import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GitData from "./components/GitData";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/clustermanagement">
          <div className="App">
            <Dashboard></Dashboard>
          </div>
        </Route>
        <Route path="/releasemanagement">
          <GitData />
        </Route>
        <Route path="/">
          {/* <Home /> */}
          <div>Please route to /clustermanagement or /releasemanagement</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
