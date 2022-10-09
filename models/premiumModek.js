const mongoose = require('mongoose');
const Joi = require("joi");

let premiumSchema = new mongoose.Schema({
    user_id: String,


})

exports.PremiumModel = mongoose.model("premiums", premiumSchema);