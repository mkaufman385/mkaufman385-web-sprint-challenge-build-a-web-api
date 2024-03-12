const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");

server.use(express.json());

server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Lets do it !!!</h2>`);
});

server.use("*", (req, res) => {
  res.send(`<h1>Project working!!</h1>`);
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
