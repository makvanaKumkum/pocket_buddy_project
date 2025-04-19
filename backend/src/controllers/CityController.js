const cityModel = require("../models/CityModel");

// // Add city
// const addCity = async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ message: "City name is required" });
//     }

//     const savedCity = await cityModel.create(req.body);
//     res.status(201).json({
//       message: "City added successfully",
//       data: savedCity,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating city", error: error.message });
//   }
// };

// Add city by stateId
const addCityByStateId = async (req, res) => {
  try {
    const { name, stateId } = req.body;

    if (!name || !stateId) {
      return res
        .status(400)
        .json({ message: "City name and stateId are required" });
    }

    // Check if city already exists in the given state
    const existingCity = await cityModel.findOne({ name, stateId });
    if (existingCity) {
      return res
        .status(400)
        .json({ message: "City already exists in this state" });
    }

    const newCity = await cityModel.create({ name, stateId });

    res.status(201).json({
      message: "City added successfully",
      data: newCity,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating city", error: error.message });
  }
};

// Get all cities
const getCities = async (req, res) => {
  try {
    const foundCity = await cityModel.find().populate("stateId");

    if (!foundCity) {
      return res.status(404).json({ message: "No cities found" });
    }

    res.status(200).json({
      message: "All cities",
      data: foundCity,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cities", error: error.message });
  }
};

// Get  cities by stateId
const getCityByStateId = async (req, res) => {
  try {
    const foundCity = await cityModel
      .find({ stateId: req.params.stateId })
      .populate("stateId");
    if (!foundCity) {
      return res
        .status(404)
        .json({ message: "No cities found for this stateId" });
    }
    res.status(200).json({
      message: "cities found",
      data: foundCity,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching city", error: error.message });
  }
};

// Delete city by cityId
const deleteCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    if (!cityId) {
      return res.status(400).json({ message: "City ID is required" });
    }

    const deletedCity = await cityModel.findByIdAndDelete(cityId);
    if (!deletedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({
      message: "City deleted successfully..",
      data: deletedCity,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting city", error: error.message });
  }
};

// Delete all cities by stateId
const deleteCityByStateId = async (req, res) => {
  try {
    const { stateId } = req.params;

    if (!stateId) {
      return res.status(400).json({ message: "State ID is required" });
    }

    const deletedCities = await cityModel.deleteMany({ stateId });

    if (!deletedCities) {
      return res
        .status(404)
        .json({ message: "No cities found for this stateId" });
    }

    res.status(200).json({
      message: "Cities deleted successfully",
      deletedCount: deletedCities.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cities", error: error.message });
  }
};

module.exports = {
  // addCity,
  addCityByStateId,
  getCities,
  getCityByStateId,
  deleteCity,
  deleteCityByStateId,
};
