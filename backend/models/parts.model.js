const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
    type: { type: Number, required: true, trim: true , default: 1},
    name: { type: String, required: true, trim: true },
    groupquestions: [{ type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'group-questions' }],
}, { timestamps: true })

module.exports = mongoose.model('parts', examSchema)
