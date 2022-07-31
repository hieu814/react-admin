const mongoose = require('mongoose')

const groupQuestionSchema = new mongoose.Schema(
	{
		type: { type: Number, required: true, trim: true , default: 1},
		label: { type: String , trim: true },
		passages: [{ type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'passages' }],
		questions: [{ type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'questions' }],
		image: { type: String , trim: true },
		audio: { type: String , trim: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('group-questions', groupQuestionSchema)
