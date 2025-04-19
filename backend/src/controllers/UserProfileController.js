const UserProfile = require("../models/UserProfileModel");

const createOrUpdateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    let user = await UserProfile.findOne({ email });

    if (user) {
      // Update profile
      user = await UserProfile.findOneAndUpdate(
        { email },
        {
          name,
          phone,

          ...(imageUrl && { imageUrl }),
        },
        { new: true }
      );
    } else {
      // Create new profile
      user = new UserProfile({
        name,
        email,
        phone,

        imageUrl,
      });
      await user.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Profile saved", data: user });
  } catch (error) {
    console.log("Error saving profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getProfileByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserProfile.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createOrUpdateProfile,
  getProfileByEmail,
};
