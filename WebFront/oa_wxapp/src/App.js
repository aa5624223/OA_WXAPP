import "./App.less";
import React, { Component } from 'react'
import 'default-passive-events'
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
//_this

import Login from "./pages/login";
import Admin from "./pages/admin";
export default class App extends Component {
  render(){
    return (
      <HashRouter>
        <Switch>
          <Route path="/Admin" component={Admin} />
          <Route path="/Login" component={Login}></Route>
          <Redirect to="/Login" />
        </Switch>
      </HashRouter>
    );
  }
  
}
