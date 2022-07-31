const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
	{
        questionnumber: { type: Number, required: true, trim: true , default: 1},
		question: { type: String, trim: true },
		A: { type: String, trim: true },
        B: { type: String, trim: true },
        C: { type: String, trim: true },
        D: { type: String, trim: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('questions', questionSchema)
