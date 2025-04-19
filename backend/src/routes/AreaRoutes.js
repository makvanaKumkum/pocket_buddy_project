const routes = require("express").Router();

const areaController = require("../controllers/AreaController");

// // Add a new area
// routes.post("/", areaController.addArea);

// Add a new area by cityId
routes.post("/area", areaController.addAreaByCityId);

// Get all areas
routes.get("/area", areaController.getAreas);

// Get areas by cityId
routes.get("/area/city/:cityId", areaController.getAreaByCityId);

// Delete an area by areaId
routes.delete("/area/:id", areaController.deleteArea);

// Delete all areas by cityId
routes.delete("/area/city/:cityId", areaController.deleteAreasByCityId);

module.exports = routes;
