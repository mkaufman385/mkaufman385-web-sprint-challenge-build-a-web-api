const express = require("express");
const { validateActionId, validateAction } = require("./actions-middlware");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {
  // later
});

router.get("/:id", validateActionId, (req, res) => {
  console.log(req.action);
});

router.post("/", validateAction, (req, res) => {
  //later
});

router.put("/:id", validateActionId, validateAction, (req, res) => {
  console.log(req.action);
  //later
});

router.delete("/:id", validateActionId, (req, res) => {
  console.log(req.action);
  //later
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Soemthing tragic inside posts router happened",
    err: err.message,
    stack: err.stack,
  });
});
module.exports = router;
