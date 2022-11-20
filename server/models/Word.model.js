const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exampleSchema = new Schema(
  {
    key: String,
    value: String,
  },
  { _id: false }
);

const meanSchema = new Schema(
  {
    value: String,
    examples: [exampleSchema],
  },
  { _id: false }
);

const typeSchema = new Schema(
  {
    type: String,
    means: [meanSchema],
  },
  { _id: false }
);

const subRelateSchema = new Schema(
  { type: String, value: [String] },
  { _id: false }
);

const Word = new Schema({
  name: String,
  pronounce: String,
  usSound: String,
  ukSound: String,
  common: [typeSchema],
  specialized: [typeSchema],
  relate: {
    synonymous: [subRelateSchema],
    antonym: [subRelateSchema],
  },
});

module.exports = mongoose.model("word", Word);
