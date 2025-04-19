const routes = require("express").Router();

const roleController = require("../controllers/RoleController");

// Get role
routes.get("/roles", roleController.getAllRoles);

// Add role
routes.post("/roles", roleController.addRole);

// delete role by id
routes.delete("/roles/:id", roleController.deleteRole);

// Get role by id
routes.get("/roles/:id", roleController.getRoleById);

module.exports = routes;
