import React, { Component } from 'react';
import logo from './logo.png';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import AddSticker from './components/AddSticker';
import StickerList from './components/StickerList';
import title from './Picture1.png';
import createBrowserHistory from "history/createBrowserHistory";
const customHistory = createBrowserHistory();
const request = require('superagent');

export default class Index extends Component {
  render() {
    return (
      <Router history={customHistory}>
        <div className="container">
          <Switch>
            <Route path='/register' component={RegistrationPage} />
            <Route path='/stickers' component={StickerList} />
            <Route path='/addStickers' component={AddSticker} />
            <Route path='/' component={App} />
          </Switch>
          <div id="header">
            <div className="App-Logo">
              <img src={logo} id="App-logo" alt="logo" />
              <img src={title} id="App-logo" alt="logo" />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm : false,
    };
    this.loginForm = this.loginForm.bind(this);
  }
  goToRegisterPage() {
    window.location.assign('/register');
  }
  goToStickerPage() {
    window.location.assign('/stickers');
  }
  loginForm() {
    this.setState({showForm : true});

  }
  render() {
    return (
      <div className="App">
        <span className="intro">
          <div id="heading">
          What is GluOn and what do we do?
          </div>

        {
          (this.state.showForm) ?
            <Login />
          :
            null
        }

          <div id="info">
          Do you ever find yourself fustrated by not knowing where ALL the stickers are, ALL the time at hackathons? Especially those special, hexagonal stickers that you plan to use to build your ever growing honeycomb on your laptop? Well look no more!
          GluOn is a database for all the stickers available at your hackathon! All users can view stickers available, but only registered accounts can add or remove stickers!
          </div>
        </span>
        <span> 
        <div className="button">
            <NavLink to="/stickers">
              Stickers
            </NavLink>
          </div> 
          <div className="button">
            <NavLink to="/register">
              Register
            </NavLink>
          </div>
        </span>
        <div className="button">
          <a onClick={this.loginForm}>
            Login
          </a>
        </div>
      </div>
    );
  }
}

class Login extends Component {
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
