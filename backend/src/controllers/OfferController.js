const offerModel = require("../models/OfferModel");

// Add offer
const addOffer = async (req, res) => {
  try {
    const savedOffer = await offerModel.create(req.body);
    res
      .status(201)
      .json({ message: "Offer is added successfully", data: savedOffer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating offer", error: error.message });
  }
};

// Add offer with file
const addOfferWithFile = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    console.log("File info:", req.file);

    const {
      title,
      description,
      active,
      startDate,
      endDate,
      latitude,
      longitude,
      stateId,
      cityId,
      areaId,
      foodType,
    } = req.body;

    // Prevent adding offer if the end date is in the past
    if (new Date(endDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Offer end date cannot be in the past." });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newOffer = new offerModel({
      title,
      description,
      active,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      latitude,
      longitude,
      stateId,
      cityId,
      areaId,
      foodType,
      image: req.file ? req.file.filename : null,
    });

    const savedOffer = await newOffer.save();
    res.status(201).json({ message: "Offer added", data: savedOffer });
  } catch (error) {
    console.error("Error in addOfferWithFile:", error);
    res.status(500).json({ message: "Add offer failed", error: error.message });
  }
};

// Get offers by location
const getOffersByLocation = async (req, res) => {
  const { state, city, area } = req.query;

  try {
    const filter = {
      ...(state && { stateId: state }),
      ...(city && { cityId: city }),
      ...(area && { areaId: area }),
      active: true,
    };

    const offers = await offerModel
      .find(filter)
      .populate("stateId cityId areaId");
    res
      .status(200)
      .json({ message: "Offers fetched successfully", data: offers });
  } catch (error) {
    console.error("Error fetching offers by location:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all offers
const getAllOffers = async (req, res) => {
  try {
    const offers = await offerModel.find().populate("locationId");
    return res.status(200).json({
      message: "All offers",
      data: offers,
    });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return res.status(500).json({
      message: "Error fetching offers",
      error: error.message,
    });
  }
};

// Get offer by id
const getOffer = async (req, res) => {
  try {
    const foundOffers = await offerModel.findById(req.params.id);
    res.status(200).json({
      message: "Offer found successfully",
      data: foundOffers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching offer", error: error.message });
  }
};

// Update offer by ID
const updateOffer = async (req, res) => {
  try {
    const updatedOffer = await offerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json({
      message: "Offer updated successfully",
      data: updatedOffer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating offer", error: error.message });
  }
};

// Delete a offer by ID
const deleteOffer = async (req, res) => {
  try {
    const deletedOffer = await offerModel.findByIdAndDelete(req.params.id);
    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting offer", error: error.message });
  }
};

module.exports = {
  addOffer,
  addOfferWithFile,
  getOffersByLocation,
  getAllOffers,
  getOffer,
  updateOffer,
  deleteOffer,
};

// const offerModel = require("../models/OfferModel");
// // const cron = require("node-cron");
// // //Cron job to delete expired offers every day at midnight
// // cron.schedule("0 0 * * *", async () => {
// //   try {
// //     const currentDate = new Date();
// //     const expiredOffers = await offerModel.deleteMany({
// //       endDate: { $lt: currentDate },
// //     });
// //     console.log(`${expiredOffers.deletedCount} expired offers deleted.`);
// //   } catch (error) {
// //     console.error("Error deleting expired offers:", error);
// //   }
// // });

// // Add offer
// const addOffer = async (req, res) => {
//   try {
//     // const offerData = {
//     //   ...req.body,
//     //   image: req.file ? req.file.filename : null,
//     // };
//     const savedOffer = await offerModel.create(req.body);
//     res
//       .status(201)
//       .json({ message: "Offer is added successfully", data: savedOffer });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating offer", error: error.message });
//   }
// };

// // Add offer with file
// const addOfferWithFile = async (req, res) => {
//   try {
//     console.log("Received data:", req.body);
//     console.log("File info:", req.file);

//     const {
//       title,
//       description,
//       active,
//       startDate,
//       endDate,
//       latitude,
//       longitude,
//       stateId,
//       cityId,
//       areaId,
//       foodType,
//     } = req.body;

//     // Prevent adding offer if the end date is in the past
//     if (new Date(endDate) < new Date()) {
//       return res
//         .status(400)
//         .json({ message: "Offer end date cannot be in the past." });
//     }

//     const image = req.file ? `/uploads/${req.file.filename}` : "";

//     const newOffer = new offerModel({
//       title,
//       description,
//       active,
//       startDate: new Date(startDate),
//       endDate: new Date(endDate),
//       latitude,
//       longitude,
//       stateId,
//       cityId,
//       areaId,
//       foodType,
//       image: req.file.filename,
//     });

//     const savedOffer = await newOffer.save();
//     res.status(201).json({ message: "Offer added", data: savedOffer });
//   } catch (error) {
//     console.error("Error in addOfferWithFile:", error);
//     res.status(500).json({ message: "Add offer failed", error: error.message });
//   }
// };

// // Get offers by location
// const getOffersByLocation = async (req, res) => {
//   const { state, city, area } = req.query;

//   try {
//     const filter = {
//       ...(state && { stateId: state }),
//       ...(city && { cityId: city }),
//       ...(area && { areaId: area }),
//       active: true,
//     };

//     const offers = await offerModel
//       .find(filter)
//       .populate("stateId cityId areaId");
//     res
//       .status(200)
//       .json({ message: "Offers fetched successfully", data: offers });
//   } catch (error) {
//     console.error("Error fetching offers by location:", error);
//     res
//       .status(500)
//       .json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // Get all offers
// const getAllOffers = async (req, res) => {
//   try {
//     const offers = await offerModel.find().populate("locationId");
//     return res.status(200).json({
//       message: "All offers",
//       data: offers,
//     });
//   } catch (error) {
//     console.error("Error fetching offers:", error);
//     return res.status(500).json({
//       message: "Error fetching offers",
//       error: error.message,
//     });
//   }
// };

// // Get offer by id
// const getOffer = async (req, res) => {
//   try {
//     const foundOffers = await offerModel.findById(req.params.id); //.populate("locationId");
//     res.status(200).json({
//       message: "Offer found successfully",
//       data: foundOffers,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching offer", error: error.message });
//   }
// };

// // Update offer by ID
// const updateOffer = async (req, res) => {
//   try {
//     const updatedOffer = await offerModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedOffer) {
//       return res.status(404).json({ message: "Offer not found" });
//     }
//     res.status(200).json({
//       message: "Offer updated successfully",
//       data: updatedLocation,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating offer", error: error.message });
//   }
// };

// // Delete a offer by ID
// const deleteOffer = async (req, res) => {
//   try {
//     const deletedOffer = await offerModel.findByIdAndDelete(req.params.id);
//     if (!deletedOffer) {
//       return res.status(404).json({ message: "Offer not found" });
//     }
//     res.status(200).json({ message: "Offer deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error deleting offer", error: error.message });
//   }
// };

// module.exports = {
//   addOffer,
//   addOfferWithFile,
//   getOffersByLocation,
//   getAllOffers,
//   getOffer,
//   updateOffer,
//   deleteOffer,
// };
