import React, { Component } from 'react';
import logo from '../logo.svg';
import '../Home.css';

export default class RegistrationPage extends Component {
  render() {
    return (
      <div className="App">
        <header id="App-header">
          <div className="App-Logo">
            <p>
              <img src={logo} className="App-logo" alt="logo" />
            </p>
          </div>
        </header>
        {/*Home button */}
        <div id="HomeButton">
          <button onClick={() => this.goToHomePage()}>
            Home
          </button>
        </div>
      </div>
    );
  }
  goToHomePage() {
  	window.location.assign('/');
  }
}