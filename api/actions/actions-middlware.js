const Action = require("./actions-model");

function validateAction(req, res, next) {
  console.log("validateAction");
  next();
}

function validateActionId(req, res, next) {
  console.log("validateActionId");
  next();
}

module.exports = {
  validateAction,
  validateActionId,
};
