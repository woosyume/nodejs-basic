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

app.get('/topic/:id', function(req, res) {
  var id = req.params.id;

  fs.readdir('data', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }

    fs.readFile('data/' + id, 'utf8', function(err, data) {
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }

      res.render('view', {topics: files, title: id, description: data})
    });
  });
});

app.get('/topic', function(req, res) {
  fs.readdir('data', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }

    res.render('view', {topics:files});
  });
});
