const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

// File upload with multer
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 이 부분에서 if를 통해 파일 종류에 따라 저장 위치를 다르게 하거나 할 수 있다.
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Can timestamp with '' + '-' + Date.now()'
  }
})

var upload = multer({ storage: _storage });
// /File upload with multer

app.use('/user', express.static('uploads')); // 유저가 자신이 올린 파일을 볼 수 있도록.
// http://localhost:3001/user/Screen Shot 2018-12-11 at 10.27.54.png-1544658487556 URL은 이렇게 된다.

app.locals.pretty = true;

app.set('views', './views_file');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3001, function() {
  console.log('Connected 3001 port!');
});

app.get('/upload', function(req, res) {
  res.render('upload');
});

app.post('/upload', upload.single('userfile'), function(req, res) {
  console.log(req.file);
  res.send('Uploaded=' + req.file.filename);
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
