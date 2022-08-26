// imports tech libraries
const path = require("path");
// other imports
const readFileAsync = require("../modules/files");

const feedbacksJsonPath = path.join(__dirname, "..", "feedbacks.json");



const routes = (app) => {
  app.get("/", (request, response) => {
      readFileAsync(feedbacksJsonPath)
        .then(data => response.json(JSON.parse(data.toString())))
        .catch(error => response.send(error));
    })
  app.get("/feedbacks", (request, response) => {
    readFileAsync(feedbacksJsonPath)
      .then(data => response.json(JSON.parse(data.toString())["feedbacks"]))
      .catch(error => response.send(error));
  })
  app.get("/feedbacks/:id", (request, response) => {
    readFileAsync(feedbacksJsonPath)
      .then(data => {
        const objData = JSON.parse(data.toString())["feedbacks"];
        const filteredData = objData.filter(({id}) => id == request.params.id);

        response.json(filteredData)
      })
      .catch(error => response.send(error));
  })
}

module.exports = routes;