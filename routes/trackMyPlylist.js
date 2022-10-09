const express = require("express");

const { auth } = require("../middlewares/auth");
const { TrackMyPlylistPlModel } = require("../models/trackMyPlylist");
const router = express.Router();

router.get("/:id", auth, async(req, res) => {
    try {
        let track = await TrackMyPlylistPlModel.find({ id_plylist: req.params.id })
        res.json(track)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }


})

router.post("/", auth, async(req, res) => {

    try {
        // שמירה בקלוקשן את הרשומה החדשה שנשלחה
        let item = new TrackMyPlylistPlModel(req.body);
        // item.id_plylist = 

        await item.save();
        // יחזיר את כל המאפיינים פלוס
        // מאפיין איי די שנוצר לו בקולקשן
        // ו __V
        res.status(201).json(item);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }
})
router.put("/:id", auth, async(req, res) => {

    try {
        let data = await TrackMyPlylistPlModel.updateOne({ id: req.params.id }, req.body);

        // modfiedCount:1 - אם נקבל את המאפיין זה אומר שהצלחנו
        // nModified : 1
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }
})

// delete
router.delete("/:id", auth, async(req, res) => {
    try {
        let data = await TrackMyPlylistPlModel.deleteOne({ id: req.params.id });
        // deletedCount:1 אם הצליח
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }
})

module.exports = router;