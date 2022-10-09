const mongoose = require('mongoose');
const Joi = require("joi");

let albumSchema = new mongoose.Schema({
    id_artist: String,
    id: String,
    images: String,
    name: String,

})

exports.AlbumModel = mongoose.model("albums", albumSchema);