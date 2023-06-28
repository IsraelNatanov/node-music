const express = require("express");
const { GeojsonModel } = require("../models/geojsonModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const type = "FeatureCollection";
    const features = await GeojsonModel.find();

    console.log(features[0].type);
    // loops through the features array and extracts the name from each feature
    // only if the properties.name field is present

    res.json({ type, features: features });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;