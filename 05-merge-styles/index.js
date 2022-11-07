const fsProm = require('fs/promises');
const path = require('path');

(async () => {
  const files = await fsProm.readdir(path.join(__dirname, './styles'),{withFileTypes: true});
  await fsProm.writeFile(__dirname + '/project-dist/' + 'bundle.css', '');
  for (const file of files){
    if (file.isFile() && path.extname(file.name).slice(1) == 'css' ){
      const styleFile = await fsProm.readFile(path.join(__dirname, './styles') + '/' + file.name, "utf8");
      await fsProm.appendFile(__dirname + '/project-dist/' + 'bundle.css', styleFile);
      }
    }
})()