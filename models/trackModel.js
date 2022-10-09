const mongoose = require('mongoose');
const Joi = require("joi");

let trackSchema = new mongoose.Schema({
    id_artist: String,
    id_album: String,
    id: String,
    images: String,
    name: String,
    preview_url: String,

})

exports.TrackModel = mongoose.model("tracks", trackSchema);