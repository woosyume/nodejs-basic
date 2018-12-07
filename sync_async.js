var fs = require('fs');

// Sync ... the next process waits for this process to be finished.
var data = fs.readFileSync('data.txt', {encoding: 'utf8'});
console.log(data);

console.log(2);
data = fs.readFile('data.txt', {encoding: 'utf8'}, function(err, data){
 console.log(3);
 console.log(data);
});
console.log(4);

