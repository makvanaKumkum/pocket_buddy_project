const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createOrUpdateProfile,
  getProfileByEmail,
} = require("../controllers/UserProfileController");

router.post("/userProfile", upload.single("image"), createOrUpdateProfile);
router.get("/userProfile/:email", getProfileByEmail);

module.exports = router;
