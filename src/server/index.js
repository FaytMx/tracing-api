const express = require("express");
const path = require("path");
const http = require("http");
const logger = require("morgan");
const helmet = require('helmet');
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const socket = require("../sockets");

socket(io);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(
//   helmet({
//       contentSecurityPolicy: false,
//   })
// );

app.disable("x-powered-by");

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

//Path publico
const publicPath = path.resolve(__dirname, "../../public");

console.log(publicPath);

app.use("/public", express.static(publicPath));

module.exports = { server, io };
