const fs = require('fs');
const path = require('path');
let result = '';
let stream = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf8');
stream.on('data', (chunk) => {
  result += chunk;
});
stream.on('end', () => console.log(result));
stream.on('error', (error) => console.log('Error', error.message));
