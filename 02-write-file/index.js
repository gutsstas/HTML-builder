const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const outFile = fs.createWriteStream(path.join(__dirname, 'text.txt'),'utf8');
stdout.write('Hello! Please, enter text!\n (Type "exit" or press Ctrl + C)\n\n');
stdin.on('data', data => {
  if(data.toString().trim() === 'exit'){
    process.exit();
  }
  outFile.write(data)
});
process.on('exit', () => stdout.write('\nGood Luck!\n'));
process.on('SIGINT', () => process.exit())