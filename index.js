require("dotenv").config();
const express = require("express");

const server = express();

server.use(express.json());

server.get("api/projects", (req, res, next) => {
  res.json({ message: "API is working " });
});

console.log(process.env.PORT, process.env.NODE_ENV);
