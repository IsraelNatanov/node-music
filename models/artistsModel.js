const mongoose = require('mongoose');
const Joi = require("joi");

let artistSchema = new mongoose.Schema({
    id: String,
    images: String,
    name: String,
    popularity: Number,
})

exports.ArtistModel = mongoose.model("artists", artistSchema);