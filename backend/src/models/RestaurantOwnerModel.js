const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantOwnerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: String,
  restaurantName: String,
  restaurantLocation: String,
  restaurantType: String,
  imageUrl: String,
});

module.exports = mongoose.model("restaurantowners", restaurantOwnerSchema);
