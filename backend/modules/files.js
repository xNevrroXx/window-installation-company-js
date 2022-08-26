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

module.exports = readFileAsync;