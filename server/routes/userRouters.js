const express = require("express");
const Review = require("./../models/Review");
const UserSchema = require("./../models/UserModel");
const router = express.Router();

router.get("/profile", async (req, res) => {
  res.json({ msg: "profile" });
});

router.post("/review", async (req, res) => {
  const data = req.body;
  try {
    const review = await Review.addReview(data);
    const reviews = await Review.find({});
    console.log(review);
    return res.json({ reviews });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/get-reviews", async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ _id: -1 });
    if (!reviews) {
      throw new Error("reviews not found");
    }
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
