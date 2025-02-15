const express = require("express");
const Project = require("./projects-model");
const { validateProject, validateId } = require("./projects-middleware");
const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get()
    .then((allProjects) => {
      res.json(allProjects);
    })
    .catch(next);
});

router.get("/:id", validateId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  const { name, description, completed } = req.body;
  Project.insert({ name, description, completed })
    .then((newProject) => {
      res.status(201).json(newProject);
      console.log(newProject);
    })
    .catch(next);
});

router.put("/:id", validateProject, validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    // Validate the request body
    if (
      !changes.name ||
      !changes.description ||
      changes.completed === undefined
    ) {
      const validationError = new Error("Invalid request body");
      validationError.status = 400;
      throw validationError;
    }

    const updatedProject = await Project.update(id, changes);

    if (updatedProject) {
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    next(err); // Pass the error to the next middleware or error handler
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

router.get("/:id/actions", validateId, async (req, res, next) => {
  try {
    const result = await Project.getProjectActions(req.params.id);
    res.json(result);
    console.log(result);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Soemthing tragic inside posts router happened",
    err: err.message,
    stack: err.stack,
  });
});

module.exports = router;
