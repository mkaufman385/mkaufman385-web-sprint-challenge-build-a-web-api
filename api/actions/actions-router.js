const express = require("express");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {});

// router.get("/:id", (req, res) => {});

// router.post("/", (req, res) => {});

// router.put("/:id", (req, res) => {});

// router.delete("/:id", (req, res) => {});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Soemthing tragic inside posts router happened",
    err: err.message,
    stack: err.stack,
  });
});
module.exports = router;
