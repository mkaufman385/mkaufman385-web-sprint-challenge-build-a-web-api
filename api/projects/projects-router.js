const express = require("express");
const Project = require("./projects-model");
const { validateProject, validateId } = require("./projects-middleware");
const router = express.Router();

// router.get("/", (req, res) => {
//   Project.get()
//     .then((allProjects) => {
//       if (allProjects.length === 0) {
//         res.json([]);
//       } else {
//         res.json(allProjects);
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Internal Server Error",
//         err: err.message,
//         stack: err.stack,
//       });
//     });
// });

router.get("/", async (req, res) => {
  try {
    const allProjects = await Project.get();

    if (allProjects.length === 0) {
      res.json([]);
    } else {
      res.json(allProjects);
    }
  } catch (err) {
    console.error("Error retrieving projects:", err);
    res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
      stack: err.stack,
    });
  }
});

router.get("/:id", validateId, (req, res) => {
  try {
    const projectId = req.params.id;
    const project = Project.get(projectId);

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

router.put("/:id", validateId, async (req, res) => {
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

router.delete("/:id", validateId, async (req, res, next) => {
  try {
    const result = await Project.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// router.get("/:id/actions", (req, res) => {});

module.exports = router;
