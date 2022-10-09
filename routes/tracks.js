const express = require("express");
const { TrackModel } = require("../models/trackModel");

const router = express.Router();

router.get("/:id", async(req, res) => {
    try {
        let track = await TrackModel.find({ id_album: req.params.id })
        res.json(track)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }


})
module.exports = router;