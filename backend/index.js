// imports tech libraries
const express = require("express");
const dotenv = require("dotenv");
// other imports
const routes = require("./routes/routes");

dotenv.config();

const app = express();
const port = process.env.PORT;

routes(app);

app.listen(port, () => {
  console.log(`Sever is running. url: http://localhost:${port}`);
})