const routes = require("express").Router();

const ratingController = require("../controllers/RatingController");

// Add rating
routes.post("/rating", ratingController.addRating);

// Get all ratings
routes.get("/ratings", ratingController.getAllRating);

// Get rating by Id
routes.get("/rating/offer/:offerId", ratingController.getRatingsByOfferId);
0;
module.exports = routes;
