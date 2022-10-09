const mongoose = require('mongoose');
const Joi = require("joi");

let trackMyPlylistSchema = new mongoose.Schema({

    id: String,
    id_plylist: String,
    images: String,
    name: String,
    preview_url: String,


})

exports.TrackMyPlylistPlModel = mongoose.model("trackMyPlylist", trackMyPlylistSchema);