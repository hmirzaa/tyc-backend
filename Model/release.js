"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const release = new Schema({
  releaseReference: {
    type: String,
  },
  requestId: {
    type: String,
    default: "",
  },
  validityData: {
    type: Date,
  },
  depotLocation: {
    type: String,
    default: "",
  },
  depotName: {
    type: String,
    default: "",
  },
  depotPhone: {
    type: Number,
    default: 0,
  },
  depotEmail: {
    type: String,
    default: "",
  },
  dropoffLocation: {
    type: String,
    default: "",
  },
  dropoffName: {
    type: String,
    default: "",
  },
  dropoffPhone: {
    type: String,
    default: "",
  },
  dropoffEmail: {
    type: String,
    default: "",
  },
  additionalRemark: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("release", release);
