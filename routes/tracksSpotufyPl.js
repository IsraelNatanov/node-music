const express = require("express");
const { TracksSpotufyPlModel } = require("../models/tracksSpotufyPlModel");

const router = express.Router();

router.get("/:id", async(req, res) => {
    try {
        let track = await TracksSpotufyPlModel.find({ id_plylist: req.params.id })
        res.json(track)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }


})
module.exports = router;