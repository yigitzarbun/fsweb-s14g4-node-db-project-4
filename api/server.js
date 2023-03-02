const express = require("express");
const server = express();
server.use(express.json());
const tariflerRouter = require("./tarifler/tarifler-router");

server.use("/api/tarifler", tariflerRouter);
server.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Server is up and running!",
  });
});

module.exports = server;
