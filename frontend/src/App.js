// File: ./src/App.js

import React from "react"
import {AuthCluster} from "./components/AuthCluster"
import {InitCluster} from "./components/init-cluster"
import {ProfileCluster} from "./components/profile-cluster"
import {useCurrentUser} from "./hooks/current-user"
import TokenData from "./components/TokenData.js"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Marketplace from './components/pages/Marketplace';
import Account from './components/pages/Account';
import SignUp from './components/pages/SignUp';

export default function App() {
  const cu = useCurrentUser()

  return (
  <>
    <Router>

      <Switch>
        <Route path = "/" exact component={Home}/>
        <Route path = "/marketplace" exact component={Marketplace}/>
        <Route path = "/account" exact component={Account}/>
        {/*<Route path = "/signup" exact component={SignUp}/>*/}
      </Switch>
    </Router>
  </>
  );
}