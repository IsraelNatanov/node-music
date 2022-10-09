const express = require("express");
const { AlbumModel } = require("../models/albumModel");

const router = express.Router();

router.get("/:id", async(req, res) => {
    await AlbumModel.find({})
    try {
        let album = await AlbumModel.find({ id_artist: req.params.id })

        res.json(album)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }


})
module.exports = router;