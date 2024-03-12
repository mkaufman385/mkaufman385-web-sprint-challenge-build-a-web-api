const express = require("express");
const server = express();
const {
  validateProject,
  validateId,
} = require("./projects/projects-middleware");
const {
  validateAction,
  validateActionId,
} = require("./actions/actions-middlware");
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use(express.json());

server.use(validateProject);
server.use(validateId);
server.use(validateAction);
server.use(validateActionId);

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

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
