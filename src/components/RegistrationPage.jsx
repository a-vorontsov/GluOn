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
              Placeholder for GluOn Image
            </p>
          </div>
        </header>
        <RegistrationForm />
        <div id="HomeButton">
          <button onClick={() => this.goToHomePage()}>
            Home
          </button>
        </div>
      </div>
    );
  }
  goToHomePage() {
  	window.location.assign('../');
  }
}

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    alert('Name submitted: ' + this.state.value);
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return(
      <div>
        <h2>Create your account</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Organization Name:
            <input name="orgname" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Email Address:
            <input name="email" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input name="password1" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input name="password2" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}