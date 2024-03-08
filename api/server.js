const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");

server.use(express.json());

server.use("/api/projects", projectsRouter);

// server.get("/", (req, res) => {
//   res.json({ message: "API is working " });
// });

server.get("/", (req, res) => {
  res.send(`<h2>Lets do it !!!</h2>`);
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
