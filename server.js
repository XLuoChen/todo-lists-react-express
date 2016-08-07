const express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
const app = new express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendfile('./views/index.html');
});

app.get('/items', function (req, res) {
  fs.readFile('./items.json', 'UTF-8', function (err, data) {
    if (err) return next(err);

    const items = JSON.parse(data);
    res.send(items);
  });
});

app.post('/item', function (req, res) {
  const item = {};
  fs.readFile('./items.json', 'UTF-8', function (err, data) {
    if (err) return next(err);
    item.item = req.body.name;
    item.isDone = req.body.isDone;
    const items = JSON.parse(data);
    items.push(item);

    fs.writeFile('./items.json', JSON.stringify(items));
  });
});

app.delete('/item/i', function (req, res) {
  fs.readFile('./items.json', 'UTF-8', function (err, data) {
    if (err) return next(err);

    const item = req.body.item;
    const items = JSON.parse(data);
    items.splice(items.indexOf(item), 1);

    fs.writeFile('./items.json', JSON.stringify(items));
  });
});

// app.put('/item/i', function (req, res) {
//   fs.readFile('./items.json', 'UTF-8', function (err, data) {
//     if (err) return next(err);
//
//     const item = req.body.item;
//     const items = JSON.parse(data);
//     const updatingItem = items[items.indexOf(item)];
//     updatingItem.isDone = !updatingItem.isDone;
//
//     fs.writeFile('./items.json', JSON.stringify(items));
//   });
// });

app.listen(3000, () => {
  console.log('Server started.');
});
