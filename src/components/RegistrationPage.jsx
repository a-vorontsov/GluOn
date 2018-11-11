import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';
const request = require('superagent');

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
          <NavLink to="/">
            Home
          </NavLink>
        </div>
      </div>
    );
  }
}

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgname: "",
      email: "",
      password1: "",
      password2: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  async handleSubmit() {
    const {password1, password2, orgname, email} = this.state;
    if (password2 === password1) {
      try {
        const req = request
          .post('http://localhost:5000/api/put-user')
          .set("Accept", "application/json")
          .set("Content-type", "application/json");
        await req.send({name: orgname, email, password: password1});
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("There was an error submitting your form, please check your password and whatnot");
    }
  }

  render() {
    return(
      <div>
        <h2>Create your account</h2>
        <form>
          <label>
            Organization Name:
            <input name="orgname" type="text" value={this.state.orgname} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
          <label>
            Email Address:
            <input name="email" type="email" value={this.state.email} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
          <label>
            Password:
            <input name="password1" type="password" value={this.state.password1} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input name="password2" type="password" value={this.state.password2} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
        </form>
        <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    );
  }
}
