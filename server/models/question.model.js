const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
    {
        number: { type: Number, required: true, trim: true, default: 1 },
        question: { type: String, trim: true, default: "" },
        A: { type: String, trim: true, default: "" },
        B: { type: String, trim: true, default: "" },
        C: { type: String, trim: true, default: "" },
        D: { type: String, trim: true, default: "" },
        correct: { type: String, trim: true, default: "" }
    }
)
module.exports = mongoose.model('question', questionSchema)