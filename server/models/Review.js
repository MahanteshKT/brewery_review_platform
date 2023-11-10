const { Schema, model } = require("mongoose");
// const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema({
  text: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 280,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "UserSchema",
  },
  author: {
    type: String,
    required: true,
  },
  brewery: {
    type: Object,
    required: true,
  },
});
reviewSchema.set("timestamps", true);
reviewSchema.statics.addReview = async function (data) {
  const { text, rating, author_id, author, brewery } = data;
  if (!author || !brewery) {
    throw new Error("all fields must be filled");
  }
  const exists = await this.findOne({
    author,
    brewery,
    author_id,
    text,
    rating,
  });
  if (exists) {
    throw new Error("you already rated");
  }
  const review = await this.create({
    text,
    rating,
    author,
    brewery,
    author_id,
  });

  return review;
};
const Review = model("Review", reviewSchema);

module.exports = Review;
