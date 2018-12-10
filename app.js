const express = require('express');
const app = express();
app.locals.pretty = true;

app.set('views', './views'); // 아무것도 선언하지 않으면 노드는 자동으로 이 디렉토리를 찾는다.
app.set('view engine', 'jade')
app.use(express.static('public'));

app.get('/topic/:id', function(req, res){ // Semantic URL
//res.send(req.query.id + ', ' + req.query.name); // We can trasfer multiple values with query string.

  var topics = [
    'Javascript is...',
    'Nodejs is...',
    'Express is...'
  ];

  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.params.id]}
  `

  //res.send(topics[req.query.id]);
  res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id + ',' + req.params.mode);
});

app.get('/template', function({req, res}) {
  res.render('temp', {time: Date(), title: 'Jade'});
});

app.get('/', function(req, res){
  res.send('Hello woosyumes home!');
});

app.get('/dynamic', function(req, res){
var lis = '';
for (var i = 0; i < 5; i++) {
  lis = lis + '<li>coding</li>';
}

var time = Date();
var output = `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Hello Dynamic! </title>
  </head>
  <body>
    Hello Dynamic!
    <ul>
    ${lis}
    </ul>
    ${time}
  </body>
</html>
`
  res.send(output);
})

app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/woohyeok.png"/>');
});

app.get('/login', function(req, res){
  res.send('Please login');
})

app.listen(3000, function(){
  console.log('Connected 3000 port!');
});
