const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.locals.pretty = true;

app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001, function() {
  console.log('Connected 3001 port!');
});

app.get('/topic/new', function(req, res) {
  res.render('new'); // Use render method when uses template engine.
});

app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }

    res.send('Success');
  });
});
