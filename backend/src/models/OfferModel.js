const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },

    locationId: {
      type: Schema.Types.ObjectId,
      ref: "locations",
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
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("offers", offerSchema);
