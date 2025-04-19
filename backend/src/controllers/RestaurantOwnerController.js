const RestaurantOwner = require("../models/RestaurantOwnerModel");

const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      restaurantName,
      restaurantLocation,
      restaurantType,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    let owner = await RestaurantOwner.findOne({ email });

    if (owner) {
      // Update profile
      owner = await RestaurantOwner.findOneAndUpdate(
        { email },
        {
          name,
          phone,
          restaurantName,
          restaurantLocation,
          restaurantType,
          ...(imageUrl && { imageUrl }),
        },
        { new: true }
      );
    } else {
      // Create new profile
      owner = new RestaurantOwner({
        name,
        email,
        phone,
        restaurantName,
        restaurantLocation,
        restaurantType,
        imageUrl,
      });
      await owner.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Profile saved", data: owner });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getProfileByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const owner = await RestaurantOwner.findOne({ email });

    if (!owner) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, data: owner });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfileByEmail,
};
