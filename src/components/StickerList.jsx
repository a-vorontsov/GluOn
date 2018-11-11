import * as React from 'react';
import {NavLink} from 'react-router-dom';
const request = require('superagent');

export default class StickerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  async componentWillMount() {
    const req = request
      .get('http://localhost:5000/api/search-stickers')
      .set("Accept", "application/json")
      .set("Content-type", "application/json")
      .query({term: ""});
    const res = await req;
    const response = JSON.parse(res.text);
    this.setState({stickerList: response});
  }
  handleChange(event) {
    event.preventDefault();
    const field = event.target.name;
    this.setState({[field]: event.target.value});
  }
  render() {
    return (
      <div>
        <h2>Stickers</h2>
        <input placeholder="Search Stickers" name="searchTerm" type="text" value={this.state.searchTerm} onChange={(value) => this.handleChange(value)}/>
        {
          (this.state.stickerList && this.state.stickerList.length > 0) ?
            <div>
              <table>
                <tbody>
                  <tr>
                    <th>Sticker Name</th>
                    <th>Organiser Name</th>
                    <th>Image</th>
                  </tr>
                  {
                    this.state.stickerList.map((sticker, key) => {
                      return (
                        <tr key={key}>
                          <td>{sticker.name}</td>
                          <td>{sticker.organiser}</td>
                          <td>{sticker.image}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          : <div>There are no stickers</div>
        }
        <NavLink to="/">Home</NavLink>
      </div>
    );
  }
}
