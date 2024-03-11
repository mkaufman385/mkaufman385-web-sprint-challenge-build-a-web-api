const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");
const { validateProject } = require("./projects/projects-middleware");

server.use(express.json());
server.use(validateProject);

server.use("/api/projects", projectsRouter);

// server.get("/", (req, res) => {
//   res.json({ message: "API is working " });
// });

server.get("/", (req, res) => {
  res.send(`<h2>Lets do it !!!</h2>`);
});

server.use("*", (req, res) => {
  res.send(`<h1>Project working!!</h1>`);
});

// ************Put back in "next" when starting to work on middleware*************
server.use((err, req, res) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    err: err.message,
    stack: err.stack,
  });
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
