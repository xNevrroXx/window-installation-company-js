// imports tech libraries
const path = require("path");
const uuid = require("uuid");
// other imports
const {readFileAsync, writeFileAsync} = require("../modules/files");
const bodyParser = require("body-parser");

const feedbacksJsonPath = path.join(__dirname, "..", "feedbacks.json");

const routes = (app) => {
  app.get("/", (request, response) => {
      readFileAsync(feedbacksJsonPath)
        .then(data => response.json(JSON.parse(data.toString())))
        .catch(error => response.send(error));
    })

  app.route("/feedbacks")
    .get((request, response) => {
      readFileAsync(feedbacksJsonPath)
        .then(data => response.json(JSON.parse(data.toString())["feedbacks"]))
        .catch(error => response.send(error));
    })
    .post((request, response) => {
      const bodyData = request.body;
      bodyData.id = uuid.v1();

      readFileAsync(feedbacksJsonPath)
        .then(data => {
          return new Promise(resolve => {
            const objData = JSON.parse(data.toString());
            const objFeedbacks = objData["feedbacks"];
            objFeedbacks.push(bodyData);
            resolve(objData);
          })
        })
        .then((objData) => writeFileAsync(feedbacksJsonPath, JSON.stringify(objData)))
        .then(() => readFileAsync(feedbacksJsonPath))
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