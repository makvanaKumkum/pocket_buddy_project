const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createOrUpdateProfile,
  getProfileByEmail,
} = require("../controllers/RestaurantOwnerController");

router.post("/profile", upload.single("image"), createOrUpdateProfile);
router.get("/profile/:email", getProfileByEmail);

module.exports = router;
