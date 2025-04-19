const routes = require("express").Router();

const stateController = require("../controllers/StateController");

//Add state
routes.post("/state", stateController.addState);

// Get all state
routes.get("/states", stateController.getAllStates);

// Delete state by id
routes.delete("/state/:id", stateController.deleteState);

// Get state by id
routes.get("/state/:id", stateController.getStateById);

module.exports = routes;
