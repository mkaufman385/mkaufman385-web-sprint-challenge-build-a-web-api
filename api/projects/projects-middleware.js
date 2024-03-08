function validateProject(req, res, next) {
  console.log("validateProject");
  next();
}

// add middlewares here related to projects

module.exports = {
  validateProject,
};
