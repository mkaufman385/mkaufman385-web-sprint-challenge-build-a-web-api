require("dotenv").config();
const express = require("express");

const server = express();

server.use(express.json());

server.get("api/projects", (req, res) => {
  res.json({ message: "API is working " });
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

console.log(process.env.PORT, process.env.NODE_ENV);
