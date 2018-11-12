const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_SECRET);
const stickerTable = client.initIndex('sticker');
const userTable = client.initIndex('user');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/put-sticker', (req, res) => {
  const input = req.body;
  stickerTable.addObjects([input], (err, content) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).send('OK');
});

app.get('/api/search-stickers', (req, res) => {
  const searchTerm = req.query.term;
  stickerTable.search({query: searchTerm}, (err, content) =>{
    if (err) {
      console.log(err);
    } else {
      const formattedResponse = [];
      content.hits.forEach(h => {
        formattedResponse.push({name: h.name, organiser: h.organiser,  image: h.image});
      });
      res.send(formattedResponse);
    }
  });
});

app.post('/api/put-user', (req, res) => {
  const input = req.body;
  userTable.addObjects([input], (err, content) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).send('OK');
});

app.post('/api/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var found = false;
  await userTable.search({query: email}).then(res => {
    console.log("asdf");
    found = res.hits.some(h => {
      return h.password === password;
    });
  });
  console.log(found);
  if (found) {
    res.status(200).send("found");
  } else {
    res.status(404).send('not found');
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));