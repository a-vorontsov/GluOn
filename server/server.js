const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const algoliasearch = require('algoliasearch');
const client = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_SECRET);
const stickerTable = client.initIndex('sticker');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// const objects = [{
//   name: 'love heart',
//   tags: ['pink', 'heart', 'stars', 'sparkles'],
//   organiser: 'Joe Nash'
// }];

// stickerTable.addObjects(objects, function(err, content) {
//   console.log(content);
// });

// stickerTable.search({
//   query: 'green',
// }, ((err, content) => {
//   if (err) {
//     console.error(error);
//   } else {
//     console.log(content.hits);
//   }
// }));

app.post('/api/put-sticker', (req, res) => {
  const input = req.body;
  stickerTable.addObjects(input, (err, content) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).send('OK');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
