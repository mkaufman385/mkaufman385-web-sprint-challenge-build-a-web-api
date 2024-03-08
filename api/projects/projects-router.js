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

// router.get("/:id", (req, res) > {});

// router.post("/", (req, res) > {});

// router.put("/:id", (req, res) > {});

// router.delete("/:id", (req, res) > {});

// router.get("/:id/actions", (req, res) > {});

module.exports = router;
