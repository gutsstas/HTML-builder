const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const { readdir } = require('fs/promises');

const wayOld = path.join(__dirname + '/assets');
const wayNew = path.join(__dirname + '/project-dist/' + '/assets');

fs.access(__dirname + '/project-dist/', async (err) => {
  if (err && err.code === 'ENOENT') {
    buildPage();
  } else {
      await deleteDir();
      buildPage();
      copyDir(wayOld, wayNew);
  }
  })

async function buildPage() {
  const filesStyle = await fsProm.readdir(path.join(__dirname, './styles'),{withFileTypes: true});
  fsProm.mkdir(__dirname + '/project-dist/');
  fsProm.writeFile(__dirname + '/project-dist/' + 'style.css', '');
  for (const file of filesStyle){
    if (file.isFile() && path.extname(file.name).slice(1) == 'css' ){
      const styleFile = await fsProm.readFile(path.join(__dirname, './styles') + '/' + file.name, "utf8");
      await fsProm.appendFile(__dirname + '/project-dist/' + 'style.css', styleFile);
      }
  } 
  const fileMain = await fsProm.readFile(path.join(__dirname + '/template.html'));
  let fileString = fileMain.toString();
  await fixHTML(fileString);

}

async function deleteDir() {
  await fsProm.rm(__dirname + '/project-dist/', { recursive: true, force: true });
}

async function fixHTML(string){
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i] == '{' && string[i + 1] == '{'){
      let tag ='';
      while(string[i] !== '}'){
        if(string[i] !== '{'){
          tag += string[i];
        }
        i++;
      }
      i++;
      const component = await fsProm.readFile(path.join(__dirname, './components') + '/' + tag + '.html');
      result += component.toString();
    }
    else{
      result += string[i];
    }
  }
  await fsProm.writeFile(__dirname + '/project-dist/' + 'index.html', result);
}

async function copyDir(wayOld, wayNew){
  const files = await readdir(wayOld,{withFileTypes: true})
  for (let file of files) {
    if(file.isFile()){
      fsProm.copyFile(wayOld + '/' + file.name, wayNew + '/' + file.name)
    }
    if(file.isDirectory()){
      await fsProm.mkdir(wayNew + '/' + file.name, {recursive: true});
      copyDir(wayOld + '/' + file.name, wayNew + '/' + file.name)
    }
  }
}
