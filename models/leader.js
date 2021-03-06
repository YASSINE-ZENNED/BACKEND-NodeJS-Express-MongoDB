const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);

const leaderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    abbr: {
      type: String,
      default: "",
    },
    featured: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
var Leaders = mongoose.model("leader", leaderSchema);

module.exports = Leaders;
