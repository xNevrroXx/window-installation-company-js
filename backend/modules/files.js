const fs = require("fs");

const readFileAsync = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if(error)
        return reject(error);

      return resolve(data);
    })
  })
}

const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', (error) => {
      if(error)
        return reject(error);

      return resolve();
    })
  })
}

module.exports = {readFileAsync, writeFileAsync};