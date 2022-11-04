const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const files = await fsProm.readdir(path.join(__dirname, './styles'),{withFileTypes: true});
    fsProm.writeFile(__dirname + '/project-dist/' + 'bundle.css', '');
    for (const file of files){
      if (file.isFile() && path.extname(file.name).slice(1) == 'css' ){
        fs.readFile(path.join(__dirname, './styles') + '/' + file.name, "utf8", function(error,data){
          if(error) throw error; // если возникла ошибка
          fsProm.appendFile(__dirname + '/project-dist/' + 'bundle.css', data);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
})()