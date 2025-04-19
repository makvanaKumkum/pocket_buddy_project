const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//express object..
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const restaurantOwnerRoutes = require("./src/routes/RestaurantOwnerRoutes");
app.use(restaurantOwnerRoutes);

const userProfileRoutes = require("./src/routes/UserProfileRoutes");
app.use(userProfileRoutes);

//import role routes
const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

//import userRoutes
const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

//import stateRoutes
const stateRoutes = require("./src/routes/StateRoutes");
app.use(stateRoutes);

//import cityRoutes
const cityRoutes = require("./src/routes/CityRoutes");
app.use(cityRoutes);

//import areaRoutes
const areaRoutes = require("./src/routes/AreaRoutes");
app.use(areaRoutes);

//import locationRoutes
const locationRoutes = require("./src/routes/LocationRoutes");
app.use(locationRoutes);

//import offerRoutes
const offerRoutes = require("./src/routes/OfferRoutes");
app.use(offerRoutes);

//import ratingRoutes
const ratingRoutes = require("./src/routes/RatingRoutes");
app.use(ratingRoutes);

//mongodb connection
mongoose
  .connect("mongodb://localhost:27017/25_pocket_buddy")
  .then(() => {
    console.log("database connected....");
  })
  .catch((err) => console.log("Database connection error", err));

//server creation...
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server started on port number ", PORT);
});

////http://localhost:5000/
