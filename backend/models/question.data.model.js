const mongoose = require('mongoose')
 const passageSchema = new mongoose.Schema(
    {
        image: { type: String, trim: true },
        content: { type: String, trim: true },
    }
)
 const questionSchema = new mongoose.Schema(
    {
        number: { type: Number, required: true, trim: true, default: 1 },
        question: { type: String, trim: true },
        A: { type: String, trim: true },
        B: { type: String, trim: true },
        C: { type: String, trim: true },
        D: { type: String, trim: true },
    },
    { _id: false }
)
module.exports = { passageSchema, questionSchema };