const express = require("express");
const { auth } = require("../middlewares/auth");
const { MyPlylistModel } = require("../models/myPlylistModel");
const { TrackMyPlylistPlModel } = require("../models/trackMyPlylist");
const router = express.Router();


router.get("/", auth, async(req, res) => {
    try {
        let user = await MyPlylistModel.find({ user_id: req.tokenData._id });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "There is probelm , try again later", err })

    }
})
router.post("/", auth, async(req, res) => {
    // בדיקה שהמידע שמגיע מצד לקוח בבאדי
    // תקין אם לא נחזיר שגיאה

    try {
        // שמירה בקלוקשן את הרשומה החדשה שנשלחה
        let item = new MyPlylistModel(req.body);
        // מוסיף מאפיין של האיי די של היוזר
        // שהוסיף את המשתמש
        // ורק יוזר עם טוקן יוכל להוסיף
        // האיי די מגיע מהטוקן
        item.user_id = req.tokenData._id;
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
router.delete("/:id", auth, async(req, res) => {
    try {
        let data = await MyPlylistModel.deleteOne({ id: req.params.id });
        await TrackMyPlylistPlModel.deleteMany({ id_plylist: req.params.id});
        // deletedCount:1 אם הצליח
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There is problem, try again later" })
    }
})
module.exports = router;