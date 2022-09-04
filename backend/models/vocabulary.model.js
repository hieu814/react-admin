const mongoose = require('mongoose')

const vocabularySchema = new mongoose.Schema({
	word: { type: String, required: true, trim: true },
	mean: { type: String, trim: true },
    image: { type: String , trim: true },
    audio: { type: String , trim: true },
    definition: { type: String , trim: true },
    pronounce: { type: String , trim: true },
    type: { type: String , trim: true },
},{ timestamps: true }
)

module.exports = mongoose.model('vocabulary', vocabularySchema)