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
  fs.readdir('data', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics: files}); // Use render method when uses template engine.
  });
});

// Input router address to array
app.get(['/topic', '/topic/:id'], function(req, res) {
  fs.readdir('data', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;

    // When request has id value
    if (id) {
      fs.readFile('data/' + id, 'utf8', function(err, data) {
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics: files, title: id, description: data})
      });
    } else {
      res.render('view', {topics:files, title:'Welcome', description: 'Hello, Javascript for Server.'});
    }
  });
});

app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;

  fs.writeFile('data/' + title, description, function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/' + title);
  });
});
