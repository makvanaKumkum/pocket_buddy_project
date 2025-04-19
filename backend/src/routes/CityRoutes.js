const routes = require("express").Router();

const cityController = require("../controllers/CityController");

// // Add a new city
// routes.post("/city", cityController.addCity);

// Add a city by stateId
routes.post("/city", cityController.addCityByStateId);

// Get all cities
routes.get("/city", cityController.getCities);

// Get cities by stateId
routes.get("/city/state/:stateId", cityController.getCityByStateId);

// Delete a city by id
routes.delete("/city/:id", cityController.deleteCity);

// Delete all cities by stateId
routes.delete("/city/state/:stateId", cityController.deleteCityByStateId);

module.exports = routes;
