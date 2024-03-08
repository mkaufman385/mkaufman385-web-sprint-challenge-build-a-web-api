const Project = require("./projects-model");

async function validateProject(req, res, next) {
  try {
    const project = await Project.insert(req.params.id);
    //if else
  } catch (err) {
    //later
  }
}

// add middlewares here related to projects

module.exports = {
  validateProject,
};
