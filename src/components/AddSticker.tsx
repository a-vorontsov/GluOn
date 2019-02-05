//Add sticker
import * as React from 'react';
import { NavLink } from 'react-router-dom';
const logo = require('../logo.png');
const request = require('superagent');

export default class AddStickerPage extends React.Component<any, any> {
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
        <AddStickerForm />
        <div id="AddButton">
          <NavLink to="/">
            Home
          </NavLink>
        </div>
      </div>
    );
  }
}

class AddStickerForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      stickerName: "",
      stickerTags: [],
      orgname: "",
      stickerImageLink: ""
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
    const {stickerName, stickerTags, orgname, stickerImageLink} = this.state;
    const tags = stickerTags.split(' ');
	try {
	const req = request
	  .post('http://localhost:5000/api/put-sticker')
	  .set("Accept", "application/json")
	  .set("Content-type", "application/json");
	await req.send({name: stickerName, tags: tags, organizer: orgname, image: stickerImageLink});
	} catch (error) {
	  alert("There was an error submitting your sticker, please check your sticker details.");
	console.error(error);
	}
}

  render() {
    return(
      <div>
        <h2>Add A Sticker:</h2>
        <form>
          <label>
            Sticker name:
            <input name="stickerName" type="text" value={this.state.stickerName} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
          <label>
            Sticker tags:
            <input name="stickerTags" type="list" value={this.state.stickerTags} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
          <label>
            Organizer:
            <input name="orgname" type="text" value={this.state.orgname} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
          <label>
            Image Link:
            <input name="stickerImageLink" type="text" value={this.state.stickerImageLink} onChange={(value) => this.handleChange(value)} />
          </label>
          <br />
        </form>
        <button onClick={() => this.handleSubmit()}>Submit</button>
      </div>
    );
  }
}
