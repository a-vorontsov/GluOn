import React, { Component } from 'react';
import logo from './logo.svg';
import './Home.css';
import { Router, Route, IndexRoute } from 'react-router'
import RegistrationPage from './components/RegistrationPage';
import createBrowserHistory from "history/createBrowserHistory";
const customHistory = createBrowserHistory();

export default class Index extends Component {
  render() {
    return (
      <Router history={customHistory}>
        <div>
          { /*Reference index page*/ }
          <Route exact path='/' component={App} />
          { /*Adds register page to the routes available*/ }
          <Route path='/Register' component={RegistrationPage} />
        </div>
      </Router>
    )
  }
}
class App extends Component {
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
        {/*Register button */}
        <div id="registerButton">
          <button onClick={() => this.goToRegisterPage()}>
            Register
          </button>
        </div>
      </div>
    );
  }
  goToRegisterPage() {
    window.location.assign('/Register');
  }
}
