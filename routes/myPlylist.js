const express = require("express");
const { auth } = require("../middlewares/auth");
const { MyPlylistModel } = require("../models/myPlylistModel");
const { PremiumModel } = require("../models/premiumModek");
const { TrackMyPlylistPlModel } = require("../models/trackMyPlylist");
const cloudinary = require('../util/cloudinary');

const router = express.Router();


router.get("/", auth, async(req, res) => {
    try {
        let allPlaylists = await MyPlylistModel.find({ user_id: req.tokenData._id });
        res.json(allPlaylists);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "There is probelm , try again later", err })

    }
})
router.post("/", auth, async(req, res) => {
    let user = await PremiumModel.findOne({
        user_id: req.tokenData._id
    })
    if (!user) return res.status(500).json({ msg: "no premium" })
    const {id, name, user_id, image} = req.body;
  
  
    try {
        const uploadedresult = await cloudinary.uploader.upload(image,{
            upload_preset: "online-shop"
        })
        
      
            let item = new MyPlylistModel({
                id,
                name,
                user_id:req.tokenData._id,
                image:uploadedresult


                

            });
       
    
       await item.save();
    
        res.status(201).json({success: true, item});
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