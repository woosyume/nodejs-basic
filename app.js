const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.send('Hello woosyumes home!'); 
});

app.get('/login', function(req, res){
  res.send('Please login');
})

app.listen(3000, function(){
  console.log('Connected 3000 port!');
});


