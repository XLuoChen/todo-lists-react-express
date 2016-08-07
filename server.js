const express = require('express');
const app = new express();
// const path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendfile('./views/index.html');
});

app.post('/test', (req, res) => {
  const name = req.params.name;
  res.send(name);
});

app.listen(3000, () => {
  console.log('Server started.');
});
