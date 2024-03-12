const Action = require("./actions-model");

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: "missing required project_id, description, or notes",
    });
  } else {
    next();
  }
}

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: "no such action",
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding action from validateActionId",
    });
  }
}

module.exports = {
  validateAction,
  validateActionId,
};
