const routes = require("express").Router();

const offerController = require("../controllers/OfferController");
const upload = require("../middleware/upload");

// Add offer
routes.post("/offer", offerController.addOffer);

// Add with file
routes.post(
  "/offer/addWithFile",
  upload.single("image"),
  offerController.addOfferWithFile
);

// GET offers by location
routes.get("/offers/location", offerController.getOffersByLocation);

// Get all offers
routes.get("/offers", offerController.getAllOffers);

// Get offer by Id
routes.get("/offer/:id", offerController.getOffer);

// Update a offer by ID
routes.put("/offer/:id", offerController.updateOffer);

// Delete offer by ID
routes.delete("/offer/:id", offerController.deleteOffer);

module.exports = routes;
