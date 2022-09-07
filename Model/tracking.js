"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tracking = new Schema({
  requestId: {
    type: String,
    default: "",
  },
  requestType: {
    type: String,
    default: "",
  },
  requestStatus: {
    type: String,
    default: "",
  },
  finalPaymentStatus: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
  requirementId: {
    type: String,
    default: "",
  },
  totalReleased: {
    type: String,
    default: "",
  },
  pickUp: {
    type: String,
    default: "",
  },
  finalPayment: {
    type: String,
    default: "",
  },
  waitingForPickup: {
    type: String,
    default: "",
  },
  damageCharge: {
    type: String,
    default: "",
  },
  emptyReturned: {
    type: String,
    default: "",
  },
  daysAfterFreeDay: {
    type: String,
    default: "",
  },
  equipmentCount: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Tracking", tracking);
