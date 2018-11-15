import React, { Component } from 'react';
const request = require('superagent');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  async handleSubmit(event) {
    try {
      const req = request
        .post('http://localhost:5000/api/login')
        .set("Accept", "application/json")
        .set("Content-type", "application/json");
      const res = await req.send({email : this.state.username, password : this.state.password});
      const response = res.text;
      if (response === "found") {
        window.location.assign('/addStickers');
      } else {
        alert("Incorrect user credentials.");
      } 
    } catch (error) {
      console.error(error);
      alert("Incorrect user credentials.");
    }
    
  }

  render() {
    return(
      <div>
        <h2>Login:</h2>
        <form>
          <label>
            Email Address:
            <input name="username" type="text" value={this.state.username} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
          <label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
        </form>
        <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    );
  }
}
