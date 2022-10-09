const mongoose = require('mongoose');
const Joi = require("joi");

let tracksSpotufyPlSchema = new mongoose.Schema({

    id: String,
    id_plylist: String,
    images: String,
    name: String,
    name_artist: String,
    preview_url: String,
    popularity: Number,

})

exports.TracksSpotufyPlModel = mongoose.model("tracksSpotufyPl", tracksSpotufyPlSchema);