const express = require("express");
const { validateActionId } = require("./actions-middlware");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {});

// router.get("/:id", validateActionId, (req, res) => {});

// router.post("/", (req, res) => {});

// router.put("/:id", validateActionId, (req, res) => {});

// router.delete("/:id", validateActionId, (req, res) => {});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Soemthing tragic inside posts router happened",
    err: err.message,
    stack: err.stack,
  });
});
module.exports = router;
