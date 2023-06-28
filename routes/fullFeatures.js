const express = require("express");
const { FullFeaturesModel } = require("../models/fuulFeaturesModel");
const { GeojsonModel } = require("../models/geojsonModel");



const router = express.Router();

router.get("/", async(req,res) => {
    try{
 
        const type = "FeatureCollection";

        const features = await FullFeaturesModel.find({});
      
    
        const featuresWithType = features.map((feature, index) => ({
            
          ...feature._doc,
          type,
          id: ++index,
          label :`${index} אירוע מספר`
        //   label
        })); // add the "type" property to each feature
    
        res.json(featuresWithType);
    }
    catch(err){
        res.json(err)
    }
})


module.exports = router;