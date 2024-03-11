const Project = require("./projects-model");

async function validateProject(req, res, next) {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message:
          "Please provide both 'name' and 'description' in the request body.",
      });
    }
    next();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Internal Server Error during validation",
      err: err.message,
      stack: err.stack,
    });
  }
}

async function validateId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "no such ID",
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Problem finding project",
    });
  }
}

// add middlewares here related to projects

module.exports = {
  validateProject,
  validateId,
};
