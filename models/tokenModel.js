const mongoose = require('mongoose');
const Joi = require("joi");
const { string, date } = require('joi');

let tokenSchema = new mongoose.Schema({

    user_id: String,
    token: String,
    created_at: Date,
    expired_at: Date
})

exports.TokenModel = mongoose.model("token", tokenSchema);