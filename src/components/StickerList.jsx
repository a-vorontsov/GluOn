import * as React from 'react';
const request = require('superagent');

export default class StickerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() {
    const req = request
      .get('http://localhost:5000/api/search-stickers')
      .set("Accept", "application/json")
      .set("Content-type", "application/json")
      .query({term: ""});
    const res = await req;
    const response = JSON.parse(res.text);
    console.log(response);
  }
  render() {
    return <div></div>;
  }
}
