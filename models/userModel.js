const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")




let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,

    role: String,
    date_created: {
        type: Date,
        default: Date.now()
    },
    img_url: String,
})

exports.UserModel = mongoose.model("users", userSchema);


exports.genToken = (user_id) => {
    let token = jwt.sign({ _id: user_id }, config.tokenSecret, { expiresIn: "30s" });
    return token;
}
exports.refrchToken = (user_id) => {
    let refrchToken = jwt.sign({ _id: user_id }, config.refrchTokenSecret, { expiresIn: "180mins" });
    return refrchToken;
}

exports.validateUser = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(999).required(),
        email: Joi.string().max(999).email().required(),
        password: Joi.string().min(3).max(999).required(),

    })
    return joiSchema.validate(_reqBody);
}

exports.validateLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().max(999).email().required(),
        password: Joi.string().min(3).max(999).required(),
    })
    return joiSchema.validate(_reqBody);
}