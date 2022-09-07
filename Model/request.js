"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const request = new Schema(
  {
    requestId: {
      type: String,
      default: "",
      unique: true,
    },
    pickLocation: {
      type: String,
      default: "",
    },
    senderId: {
      type: String,
      default: "",
    },
    dropLocation: {
      type: String,
      default: "",
    },
    senderName: {
      type: String,
      default: "",
    },
    senderDate:{
      type: String,
      default: "",
    },
    recieverDate:{
      type: String,
      default: "",
    },
    requirementId: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
    recieverId: {
      type: String,
      default: "",
    },
    recieverName: {
      type: String,
      default: "",
    },
    recieverCompany: {
      type: String,
      default: "",
    },
    senderCompany: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    approved: {
      type: Boolean,
      default: false,
    },
    freeDays: {
      type: Number,
      default: 0,
    },
    PerDiem: {
      type: Number,
      default: 0,
    },
    Pickup: {
      type: Number,
      default: 0,
    },
    DPP: {
      type: Number,
      default: 0,
    },
    newBuild: {
      type: Number,
      default: 0,
    },
    depreciation: {
      type: Number,
      default: 0,
    },
    replacement: {
      type: Number,
      default: 0,
    },
    paymentType: {
      type: String,
      default: "",
    },
    amount: {
      type: String,
      default: "",
    },
    paymentSlip: {
      type: String,
      default: "",
    },
    paymentName: {
      type: String,
      default: "",
    },
    tradeType: {
      type: String,
      default: "",
    },
    container: {
      type: String,
      default: "",
    },
    paymentStatus: {
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
    acceptanceStatus: {
      type: String,
      default: "",
    },
    equipmentType: {
      type: String,
      default: "",
    },
    equipementCount: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    userType: {
      type: Boolean,
      default: true,
    },
    damaghCharge: {
      type: Number,
      default: 0,
    },
    additional: {
      type: String,
      default: "",
    },
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Request", request);
