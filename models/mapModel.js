const mongoose = require('mongoose');
const Joi = require("joi");


let NapScema = new mongoose.Schema({
    
coordinateId:String,
marker_data:String,

icon:Object,


})

exports.MapModel = mongoose.model("maps",NapScema);