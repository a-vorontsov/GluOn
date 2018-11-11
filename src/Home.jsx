import React, { Component } from 'react';
import logo from './logo.svg';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import StickerList from './components/StickerList';
import createBrowserHistory from "history/createBrowserHistory";
const customHistory = createBrowserHistory();

export default class Index extends Component {
  render() {
    return (
      <Router history={customHistory}>
        <div className="container">
          <Switch>
            <Route path='/register' component={RegistrationPage} />
            <Route path='/stickers' component={StickerList} />
            <Route path='/' component={App} />
          </Switch>
        </div>
      </Router>
    )
  }
}

class App extends Component {
  goToRegisterPage() {
    window.location.assign('/register');
  }
  goToStickerPage() {
    window.location.assign('/stickers');
  }
  render() {
    return (
      <div className="App">
        <header id="App-header">
          <div className="App-Logo">
            <p>
              <img src={logo} className="App-logo" alt="logo" />
              Placeholder for GluOn Image
            </p>
          </div>
        </header>
        <div id="registerButton">
          <NavLink to="/register">
            Register
          </NavLink>
        </div>
        <div id="registerButton">
          <NavLink to="/stickers">
            Stickers
          </NavLink>
        </div>
      </div>
    );
  }
}
