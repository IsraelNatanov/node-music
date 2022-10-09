const mongoose = require('mongoose');
const Joi = require("joi");

let plylistSpotifySchema = new mongoose.Schema({

    id: String,
    images: String,
    name: String,
    total: Number,

})

exports.PlylistSpotifyModel = mongoose.model("plylistSpotifys", plylistSpotifySchema);