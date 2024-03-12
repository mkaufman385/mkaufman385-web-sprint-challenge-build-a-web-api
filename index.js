require("dotenv").config();
const express = require("express");

const server = require("./api/server");

const PORT = process.env.PORT || 9000;

server.use(express.json());

server.get("api/projects", (req, res) => {
  res.json({ message: "API is working " });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
