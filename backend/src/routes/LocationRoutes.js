const routes = require("express").Router();

const locationController = require("../controllers/LocationController");

// Add a new location
routes.post("/location", locationController.addLocationByAreaId);

// Get all locations
routes.get("/location", locationController.getAllLocations);

// Get a single location by ID
routes.get("/location/:id", locationController.getLocationById);

// Get locations by cityId
routes.get("/location/city/:cityId", locationController.getLocationsByCityId);

// Locations by areaId
routes.get("/location/area/:areaId", locationController.getLocationsByAreaId);

// Update a location by ID
routes.put("/location/:id", locationController.updateLocation);

// Delete a location by ID
routes.delete("/location/:id", locationController.deleteLocation);

module.exports = routes;
