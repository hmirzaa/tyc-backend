"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const container = new Schema({
  containerId: {
    type: String,
    default: "",
  },
  requestId: {
    type: String,
  },
  containerType: {
    type: String,
    default: "",
  },
  containerStatus: {
    type: String,
    default: "Waiting for Pick-up",
  },
  containerNumberPlate: {
    type: String,
    default: "",
  },
  containerNote: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("container", container);
