const Project = require("./projects-model");

function validateProject(req, res, next) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message:
        "Please provide both 'name' and 'description' in the request body.",
    });
  } else {
    next();
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
