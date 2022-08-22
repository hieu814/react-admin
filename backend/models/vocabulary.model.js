const mongoose = require('mongoose')

const vocabularySchema = new mongoose.Schema({
    category: [{ type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'vocabulary_categories' }],
	word: { type: String, required: true, trim: true },
	description: { type: String, trim: true },
    image: { type: String , trim: true },
    audio: { type: String , trim: true },
},{ timestamps: true }
)

module.exports = mongoose.model('vocabulary', vocabularySchema)
