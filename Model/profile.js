"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userProfile = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  date:{
    type: String,
    default:"",
  },
  email: {
    type: String,
    default: "",
  },
  firebaseId: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  paypal: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  zipCode: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  timeSetting: {
    type: String,
    default: "",
  },
  memberSince: {
    type: String,
    default: "",
  },
  companyLogo: {
    //image upload
    type: String,
  },
  companyLicense: {
    //image upload
    type: String,
  },
  companyName: {
    type: String,
    default: "",
  },
  companyTags: {
    type: String,
    default: "",
  },
  companyAbout: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("userProfile", userProfile);
