const express = require("express");
const { MapModel } = require("../models/mapModel");

const router = express.Router();

router.get("/", async(req,res) => {
    try{

    
      let data =await MapModel.find()
      res.json(data);
    }
    catch(err){
        res.json(err)
    }
})


module.exports = router;