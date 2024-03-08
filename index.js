require("dotenv").config();
const express = require("express");

const server = require("./api/server");

const PORT = process.env.PORT || 9000;

server.use(express.json());

server.get("api/projects", (req, res) => {
  res.json({ message: "API is working " });
});

// server.use("*", (req, res) => {
//   res.send(`<h1>Project working!!</h1>`);
// });

// ************Put back in "next" when starting to work on middleware*************
server.use((err, req, res) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
