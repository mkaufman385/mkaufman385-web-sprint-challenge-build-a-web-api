const express = require("express");
const { validateActionId, validateAction } = require("./actions-middlware");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  const { project_id, description, notes } = req.body;
  Action.insert({
    project_id,
    description,
    notes,
  })
    .then((newAction) => {
      res.status(201).json(newAction);
      console.log(newAction);
    })
    .catch(next);
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
    customMessage: "Soemthing tragic inside action router happened",
    err: err.message,
    stack: err.stack,
  });
});
module.exports = router;
