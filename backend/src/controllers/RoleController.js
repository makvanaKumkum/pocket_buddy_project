const roleModel = require("../models/RoleModel");

// Get all Role
const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.find();

    res.status(200).json({
      message: "role fetched successfully",
      data: roles,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching roles", error: error.message });
  }
};

// Add Role
const addRole = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ message: "Role name is required" });
    }

    const savedRole = await roleModel.create(req.body);
    res.status(201).json({
      message: "role created...",
      data: savedRole,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating role", error: error.message });
  }
};

// Delete Role
const deleteRole = async (req, res) => {
  try {
    const deletedRole = await roleModel.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({
      message: "role deleted successfully..",
      data: deletedRole,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting role", error: error.message });
  }
};

// Get Role by Id
const getRoleById = async (req, res) => {
  try {
    const foundRole = await roleModel.findById(req.params.id);
    if (!foundRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({
      message: "role fatched..",
      data: foundRole,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching role", error: error.message });
  }
};

module.exports = {
  getAllRoles,
  addRole,
  deleteRole,
  getRoleById,
};
