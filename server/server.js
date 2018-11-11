const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_SECRET);
const stickerTable = client.initIndex('sticker');
const userTable = client.initIndex('user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  const input = req.body;
  console.log(input);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/api/put-sticker', (req, res) => {
  const input = req.body;
  stickerTable.addObjects(input, (err, content) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).send('OK');
});

app.get('/api/search-stickers', (req, res) => {
  const searchTerm = req.body.term;
  stickerTable.search({query: searchTerm}, (err, content) =>{
    if (err) {
      console.log(err);
    } else {
      res.send(content.hits);
    }
  });
});

app.post('/api/put-user', (req, res) => {
  const input = req.body;
  userTable.addObjects(input, (err, content) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).send('OK');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
