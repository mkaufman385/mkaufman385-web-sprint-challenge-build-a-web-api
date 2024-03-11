const Project = require("./projects-model");

async function validateProject(req, res, next) {
  // console.log(`you made a ${req.method} request`);
  // next();
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

// add middlewares here related to projects

module.exports = {
  validateProject,
};
