const routes = require("express").Router();

const userController = require("../controllers/UserController");

// Add user detail
routes.post("/user", userController.signup);

// Get all users
routes.get("/users", userController.getAllUsers);

// Get a single user by Id
routes.get("/user/:id", userController.getUserById);

// Delete user by Id
routes.delete("/user/:id", userController.deleteUserById);

// User login
routes.post("/user/login", userController.loginUser);

// Forgot password
routes.post("/user/forgotPassword", userController.forgotPassword);

// Reset password
routes.post("/user/resetPassword", userController.resetPassword);

module.exports = routes;
