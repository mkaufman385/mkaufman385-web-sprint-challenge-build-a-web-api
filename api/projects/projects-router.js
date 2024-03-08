const express = require("express");
const Project = require("./projects-model");
const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then((allProjects) => {
      res.json(allProjects);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Empty Array",
        err: err.message,
        stack: err.stack,
      });
    });
});

router.get("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.get(projectId);
    console.log("PROJECT -->", project);

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({
        message: "No project exists with this id",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
      stack: err.stack,
    });
  }
});

// router.post("/", (req, res) => {});

// router.put("/:id", (req, res) => {});

// router.delete("/:id", (req, res) => {});

// router.get("/:id/actions", (req, res) => {});

module.exports = router;
