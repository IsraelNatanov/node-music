const express = require("express");
const { TrackModel } = require("../models/trackModel");

const router = express.Router();

router.get("/sung/:id", async(req, res) => {
    try {
        let track = await TrackModel.find({ id_album: req.params.id })
        res.json(track)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }


})

router.get("/search", async(req, res) => {
    try {
        let s = req.query.s;
        let searchExp = new RegExp(s)
        let dete = await TrackModel.find({name:searchExp})
        res.json(dete)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }


})
module.exports = router;