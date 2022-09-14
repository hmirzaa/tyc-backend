// const request = require('request');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5500;
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => res.send("Hello World"));
require("../Config/config");
var routes = require("../Routes/routes");
routes(app);
app.listen(port, () => console.log(`Node server running at http://localhost:${port}`));
app.use(cors());
// app.listen(port, () =>
//   console.log(`Node server running at http://localhost:${port}`)
// );
// app.use(cors());
