const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { PremiumModel } = require('../models/premiumModek');
const { auth } = require("../middlewares/auth");
const {config} = require("../config/secret")
const Stripe = require('stripe')(config.secrtKey);
var cors = require('cors');
const router = express.Router();


console.log(config.secrtKey);

router.post("/", auth, async(req, res) => {
    let status, error;
    const { token, amount } = req.body;
    if (amount != 1000) {
        console.log(amount)
        return res.status(400).json({ msg: "Email already in system", code: 11000 })
    }
    try {
        await Stripe.charges.create({
            source: token.id,
            amount,
            currency: 'usd',
        });

        status = 'success';
        console.log(token)
        let item = new PremiumModel(req.body);
        item.user_id = req.tokenData._id;
        item.user_name = req.tokenData.name;


        await item.save();

    } catch (error) {
        console.log(error);
        status = 'Failure';
    }
    res.json({ error, status });
});

router.get("/", auth, async(req, res) => {

    try {

        let item = await PremiumModel.findOne({
            user_id: req.tokenData._id
        })
        if (item) res.json(item)

        else res.status(404).json("no");


    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is not pay" })
    }
})

module.exports = router;