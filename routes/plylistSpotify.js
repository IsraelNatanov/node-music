const express = require("express");
const { auth } = require("../middlewares/auth");
const { PlylistSpotifyModel } = require("../models/plylistSpotifyModel");
const { PremiumModel } = require("../models/premiumModek");

const router = express.Router();

router.get("/", auth, async(req, res) => {
    // let user = await PremiumModel.findOne({
    //     user_id: req.tokenData._id
    // })
    // if (!user) return res.status(500).json({ msg: "no premium" })
    try {
        let plylist = await PlylistSpotifyModel.find({})
        res.json(plylist)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }



})


module.exports = router;