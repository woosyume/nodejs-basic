const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/woohyeok.png"/>');
});

app.get('/login', function(req, res){
  res.send('Please login');
})

app.listen(3000, function(){
  console.log('Connected 3000 port!');
});


