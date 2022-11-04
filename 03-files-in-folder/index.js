const fs = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const files = await fs.readdir(path.join(__dirname, './secret-folder'),
    {withFileTypes: true});

    for (const file of files){
      if (file.isFile()){
        const filePath = path.join(__dirname, './secret-folder', file.name);
        const fileExtname = path.extname(file.name).slice(1);
        const fileName = path.parse(filePath).name;
        const fileSize = (await fs.stat(filePath)).size;
        console.log(`${fileName} - ${fileExtname} - ${fileSize / 1024}kb`);
      }
    }
  } catch (err) {
    console.error(err);
  }
})()
