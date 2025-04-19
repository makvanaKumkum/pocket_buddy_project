const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    enum: ["Admin", "Restaurant Owner", "User"],
    default: "User",
  },
});

module.exports = mongoose.model("roles", roleSchema);
