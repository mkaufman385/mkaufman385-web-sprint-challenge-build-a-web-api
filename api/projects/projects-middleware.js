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

    // Additional validation logic can be added here if needed

    // If validation passes, move on to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "Internal Server Error during validation",
      err: err.message,
      stack: err.stack,
    });
  }

  // try {
  //   const project = await Project.insert(req.params.id);
  //   //if else
  // } catch (err) {
  //   //later
  // }
}

// add middlewares here related to projects

module.exports = {
  validateProject,
};
