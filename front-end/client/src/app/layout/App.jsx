import React, { Component } from 'react';
import NavBar from '../../features/nav/NavBar/NavBar';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProfileDashboard from '../../features/Profile/ProfileDashboard';
import Testing from '../../components/ItemList';
import ExistingUser from '../../features/yelpuser/ExistingUser/ExistingUser'
import store from '../store/store';
import { loadUser } from '../actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/testing' component={Testing} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/profile' component={ProfileDashboard} />
            <Route exact path='/existinguser' component={ExistingUser} />
            <Route path='*' component={() => "404 NOT FOUND"} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
