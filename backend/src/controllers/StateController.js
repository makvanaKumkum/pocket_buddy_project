const stateModel = require("../models/StateModel");

// Add State
const addState = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "State name is required" });
    }

    const savedState = await stateModel.create(req.body);
    res.status(201).json({
      message: "State added successfully",
      data: savedState,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating state",
    });
  }
};

// Get all states
const getAllStates = async (req, res) => {
  try {
    const states = await stateModel.find();
    res.status(200).json({
      message: "All states fetched successfully",
      data: states,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching state", error: error.message });
  }
};

// Delete State
const deleteState = async (req, res) => {
  try {
    const deletedState = await stateModel.findByIdAndDelete(req.params.id);
    if (!deletedState) {
      return res.status(404).json({ message: "State not found" });
    }

    res.status(200).json({
      message: "State deleted successfully..",
      data: deletedState,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting state", error: error.message });
  }
};

// Get state by Id
const getStateById = async (req, res) => {
  try {
    const foundState = await stateModel.findById(req.params.id);
    if (!foundState) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json({
      message: "role fatched..",
      data: foundState,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching state", error: error.message });
  }
};

module.exports = {
  addState,
  getAllStates,
  deleteState,
  getStateById,
};
