const locationModel = require("../models/LocationModel");

// Add a new location
const addLocationByAreaId = async (req, res) => {
  try {
    const newLocation = await locationModel.create(req.body);

    res.status(201).json({
      message: "Location added successfully",
      data: newLocation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating location", error: error.message });
  }
};

// Get all locations
const getAllLocations = async (req, res) => {
  try {
    const foundLocations = await locationModel
      .find()
      .populate("areaId")
      .populate("cityId")
      .populate("stateId");
    res.status(200).json({
      message: "All Locations",
      data: foundLocations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching location", error: error.message });
  }
};

// Get a single location by ID
const getLocationById = async (req, res) => {
  try {
    const foundLocation = await locationModel
      .findById(req.params.id)
      .populate("areaId  cityId  stateId ");
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({
      message: "Location found successfully",
      data: foundLocation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving location", error: error.message });
  }
};

// Get locations by cityId
const getLocationsByCityId = async (req, res) => {
  try {
    const foundLations = await locationModel
      .find({ cityId: req.params.cityId })
      .populate("areaId")
      .populate("cityId stateId ");
    res.status(200).json({
      message: "Locations found successfully",
      data: foundLations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving locations", error: error.message });
  }
};

// Get locations by areaId
const getLocationsByAreaId = async (req, res) => {
  try {
    const locations = await locationModel
      .find({ areaId: req.params.areaId })
      .populate("areaId cityId stateId");
    res.status(200).json({
      message: "Locations found successfully",
      data: locations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving locations", error: error.message });
  }
};

// Update a location by ID
const updateLocation = async (req, res) => {
  try {
    const updatedLocation = await locationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({
      message: "Location updated successfully",
      data: updatedLocation,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating location", error: error.message });
  }
};

// Delete a location by ID
const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await locationModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting location", error: error.message });
  }
};

module.exports = {
  addLocationByAreaId,
  getAllLocations,
  getLocationById,
  getLocationsByCityId,
  getLocationsByAreaId,
  updateLocation,
  deleteLocation,
};
