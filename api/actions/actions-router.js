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

router.put("/:id", validateActionId, validateAction, async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;

    if (!changes.project_id || !changes.description || !changes.notes) {
      const validationError = new Error("Invalid request body");
      validationError.status = 400;
      console.log(validationError);
      throw validationError;
    }

    const updatedAction = await Action.update(id, changes);

    if (updatedAction) {
      console.log("Action updated successfully:", updatedAction);
      res.json(updatedAction);
    } else {
      console.log("Action not found");
      res.status(404).json({ message: "Action not found" });
    }
  } catch (err) {
    console.error("Error updating action:", err);
    next(err);
  }
});

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    const result = await Action.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Soemthing tragic inside action router happened",
    err: err.message,
    stack: err.stack,
  });
});
module.exports = router;
