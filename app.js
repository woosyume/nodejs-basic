const express = require('express');
const app = express();
app.use(express.static('public'));

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
