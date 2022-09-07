"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const requirement = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  companyLogo: {
    type: String,
    default: "",
  },
  firebaseId: {
    type: String,
    default: "",
  },
  date:{
type:String,
default:""
  },
  userType: {
    type: Boolean,
  },
  pickLocation: {
    type: String,
    default: "",
  },
  dropLocation: {
    type: String,
    default: "",
  },
  direction: {
    type: String,
    default: "",
  },
  validation: {
    type: String,
    default: "",
  },
  equipmentType: {
    type: String,
    default: "",
  },
  tradeType: {
    type: String,
    default: "",
  },
  size: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: "",
  },
  containerCondition: {
    type: String,
    default: "",
  },
  equipmentCount: {
    type: Number,
    default: 0,
  },
  usesCount: {
    type: Number,
    default: 0,
  },
  activeMatchmaking: {
    type: Boolean,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  requests: {
    type: Array,
    default: [],
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("Requirement", requirement);
