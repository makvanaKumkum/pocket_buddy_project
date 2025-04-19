const areaModel = require("../models/AreaModel");

// // add a new area
// const addArea = async (req, res) => {
//   try {
//     if (!req.body.name) {
//       return res.status(400).json({ message: "Area name is required" });
//     }

//     const savedArea = await areaModel.create(req.body);
//     res.status(201).json({
//       message: "Area added successfully",
//       data: savedArea,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating city", error: error.message });
//   }
// };

// Add area by cityId
const addAreaByCityId = async (req, res) => {
  try {
    const newArea = await areaModel.create({ name, cityId });

    res.status(201).json({
      message: "Area added successfully",
      data: newArea,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating area", error: error.message });
  }
};

// get all areas
const getAreas = async (req, res) => {
  try {
    const foundAreas = await areaModel
      .find()
      .populate("cityId")
      .populate("stateId");
    res.status(200).json({
      message: "All Areas",
      data: foundAreas,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching area", error: error.message });
  }
};

// Get a single area by cityId
const getAreaByCityId = async (req, res) => {
  try {
    const foundAreas = await areaModel
      .find({ cityId: req.params.cityId })
      .populate("cityId")
      .populate("stateId");
    if (!foundAreas) {
      return res.status(404).json({ message: "No area found for this cityId" });
    }
    res.status(200).json({
      message: "Area found",
      data: foundAreas,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching area", error: error.message });
  }
};

// Delete an area by Id
const deleteArea = async (req, res) => {
  try {
    const { areaId } = req.params;

    if (!areaId) {
      return res.status(400).json({ message: "Area ID is required" });
    }

    const deletedArea = await areaModel.findByIdAndDelete(areaId);

    if (!deletedArea) {
      return res.status(404).json({ message: "Area not found" });
    }

    res.status(200).json({
      message: "Area deleted successfully",
      data: deletedArea,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting area", error: error.message });
  }
};

// Delete all area by cityId
const deleteAreasByCityId = async (req, res) => {
  try {
    const { cityId } = req.params;

    if (!cityId) {
      return res.status(400).json({ message: "cityId is required" });
    }

    const deletedAreas = await areaModel.deleteMany({ cityId });

    if (!deletedAreas) {
      return res
        .status(404)
        .json({ message: "No areas found for this cityId" });
    }

    res.status(200).json({
      message: "Areas deleted successfully",
      deletedCount: deletedAreas.deletedCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting areas", error: error.message });
  }
};

module.exports = {
  // addArea,
  addAreaByCityId,
  getAreas,
  getAreaByCityId,
  deleteArea,
  deleteAreasByCityId,
};
