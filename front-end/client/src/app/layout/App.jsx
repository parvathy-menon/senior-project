import React, { Component } from 'react';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProfileDashboard from '../../features/Profile/ProfileDashboard';
import Testing from '../../components/ItemList';
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/testing' component={Testing} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/ItemDashboard' component={HomePage} />
            <Route exact path='/profile' component={ProfileDashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
