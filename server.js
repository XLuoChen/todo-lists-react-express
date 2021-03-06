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

app.delete('/item', function (req, res) {
  fs.readFile('./items.json', 'UTF-8', function (err, data) {
    if (err) return next(err);

    const i = req.body.index;
    const items = JSON.parse(data);
    items.splice(i, 1);

    fs.writeFile('./items.json', JSON.stringify(items));
  });
});

app.put('/item', function (req, res) {
  fs.readFile('./items.json', 'UTF-8', function (err, data) {
    if (err) return next(err);

    const i = req.body.index;
    const items = JSON.parse(data);
    items[i].isDone = !items[i].isDone;

    fs.writeFile('./items.json', JSON.stringify(items));
  });
});

app.delete('/doneItem', function (req, res) {
  fs.readFile('./items.json', 'UTF-8', function (err, data) {
    if (err) return next(err);

    const items = JSON.parse(data);
    const activeItems = items.filter(item => item.isDone === false);

    fs.writeFile('./items.json', JSON.stringify(activeItems));
  });
});

app.listen(3000, () => {
  console.log('Server started.');
});
