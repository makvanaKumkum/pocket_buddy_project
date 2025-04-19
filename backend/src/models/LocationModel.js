const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    locationName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      // required: true,
      // unique: true,
    },
    description: {
      type: String,
      // unique: true,
    },
    timings: {
      type: String,
      // unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    contactNumber: {
      type: String,
      unique: true,
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "states",
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "cities",
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: "areas",
    },
    foodType: {
      type: String,
    },
    latitude: {
      type: Number,
      unique: true,
    },
    longitude: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("locations", locationSchema);
