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

router.post("/", (req, res) => {
  const { name, description } = req.body;
  // create a middleware validateProject and then remove the if statement, and should be good

  if (!name || !description) {
    res.status(400).json({
      message:
        "Please provide both 'name' and 'description' in the request body.",
    });
  } else {
    Project.insert({ name, description })

      .then((newProject) => {
        res.status(201).json(newProject); // Respond with the newly created project
      })
      .catch((err) => {
        console.error("Error:", err);
        res.status(500).json({
          message:
            "There was an error while saving the project to the database",
          err: err.message,
          stack: err.stack,
        });
      });
  }

  // const { name, description } = req.body;
  // if (!name || !description) {
  //   res.status(400).json({
  //     message: "Please be sure to provide both body and description",
  //   });
  // } else {
  //   Project.insert({ name, description })
  //     .then(({ id }) => {
  //       console.log(id);
  //       res.status(201).json({ id });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         message: "There was an error while saving the post to the database",
  //         err: err.message,
  //         stack: err.stack,
  //       });
  //     });
  // }
});

// router.put("/:id", (req, res) => {});

// router.delete("/:id", (req, res) => {});

// router.get("/:id/actions", (req, res) => {});

module.exports = router;
