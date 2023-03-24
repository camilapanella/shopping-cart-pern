const express = require("express");
const routes = require("./routes/index.js");

const server = express();
const cors = require("cors");

server.use(cors());
server.use(express.json());

server.use("/", routes);

module.exports = server;