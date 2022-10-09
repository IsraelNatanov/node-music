const express = require("express");
const { ArtistModel } = require("../models/artistsModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth, async(req, res) => {
    try {
        let artist = await ArtistModel.find({})
        res.json(artist)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }


})
module.exports = router;