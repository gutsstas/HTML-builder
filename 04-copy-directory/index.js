const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const { readdir } = require('fs/promises');
const { log } = require('console');

const pathOld = path.join(__dirname, './files');
const pathNew = path.join(__dirname, './files-copy');

fs.access(pathNew, async (err) => {
  if (err && err.code === 'ENOENT') {
    copyDir()
  } else {
      await deleteDir();
      copyDir();
  }
})

async function deleteDir() {
  await fsProm.rm(pathNew, { recursive: true, force: true });
}

async function copyDir(){
  fsProm.mkdir(pathNew, { recursive: true });
  const files = await readdir(pathOld,{withFileTypes: true})
  for (let file of files) {
    fsProm.copyFile(pathOld + '/' + file.name, pathNew + '/' + file.name)
  }
  console.log(`${files.length} file(s) copied succesfully`)
}