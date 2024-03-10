const express = require("express");
const Project = require("./projects-model");
const { validateProject } = require("./projects-middleware");
const router = express.Router();

router.get("/", (req, res) => {
  Project.get()
    .then((allProjects) => {
      if (allProjects.length === 0) {
        res.json([]);
      } else {
        res.json(allProjects);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Server Error",
        err: err.message,
        stack: err.stack,
      });
    });

  // Project.get()
  //   .then((allProjects) => {
  //     res.json(allProjects);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       message: "Empty Array",
  //       err: err.message,
  //       stack: err.stack,
  //     });
  //   });
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

router.post("/", validateProject, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message:
          "Please provide both 'name' and 'description' in the request body.",
      });
    }

    const newProject = await Project.insert({ name, description });

    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "There was an error while saving the project to the database",
      err: err.message,
      stack: err.stack,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    const updatedProject = await Project.update(id, changes);

    if (updatedProject) {
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
      stack: err.stack,
    });
  }
});

// router.delete("/:id", (req, res) => {});

// router.get("/:id/actions", (req, res) => {});

module.exports = router;
