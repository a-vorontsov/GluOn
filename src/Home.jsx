import React, { Component } from 'react';
import logo from './logo.svg';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import AddSticker from './components/AddSticker';
import StickerList from './components/StickerList';
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
        <header id="App-header">
          <div className="App-Logo">
            <p>
              <img src={logo} className="App-logo" alt="logo" />
              Placeholder for GluOn Image
            </p>
          </div>
        </header>

        {
          (this.state.showForm) ?
            <Login />
          :
            null
        }

        <div>
          About the website...
        </div>
        <div id="registerButton">
          <button onClick={this.loginForm}>
            Login
          </button>
        </div>
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
