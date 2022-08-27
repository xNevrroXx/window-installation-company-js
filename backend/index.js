// imports tech libraries
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
// other imports
const routes = require("./routes/routes");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
routes(app);

app.listen(port, () => {
  console.log(`Sever is running. url: http://localhost:${port}`);
})