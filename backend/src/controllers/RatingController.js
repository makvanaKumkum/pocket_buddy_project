const ratingModel = require("../models/RatingModel");

// Add rating
const addRating = async (req, res) => {
  try {
    const { offerId, comments, rating, userId } = req.body;

    console.log("Received rating data:", req.body);

    const savedRating = await ratingModel.create({
      offerId: req.params.offerId,
      comments,
      rating,
      userId: req.params.userId,
    });
    res
      .status(201)
      .json({ message: "Rating is added successfully", data: savedRating });
  } catch (error) {
    console.log("Error in addRating:", error);
    res
      .status(500)
      .json({ message: "Error creating rating", error: error.message });
  }
};

// Get all ratings
const getAllRating = async (req, res) => {
  try {
    const foundRatings = await ratingModel.find();
    res.status(200).json({
      message: "All ratings",
      data: foundRatings,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching rating", error: error.message });
  }
};

// Get ratings by offer ID

const getRatingsByOfferId = async (req, res) => {
  try {
    const { offerId } = req.params;
    const foundRatings = await ratingModel
      .find({ offerId })
      .sort({ createdAt: -1 })
      .populate("userId", "name");

    res.status(200).json({
      message: "Ratings fetched successfully",
      data: foundRatings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving ratings",
      error: error.message,
    });
  }
};

module.exports = {
  addRating,
  getAllRating,
  getRatingsByOfferId,
};
