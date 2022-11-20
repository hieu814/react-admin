const mongoose = require('mongoose')
const questionSchema = require('./question.model').schema
const passageSchema = require('./passages.model').schema
const groupQuestionSchema = new mongoose.Schema(
	{
		type: { type: Number, required: true, default: 1 },
		group: {
			from: { type: Number, required: true, default: 1 },
			to: { type: Number, required: true, default: 1 }
		},
		passages: [passageSchema],
		questions: [questionSchema],
		transcript: { type: String, trim: true ,default: ""},
		image: { type: String, trim: true },
		audio: { type: String, trim: true },
	}
)


module.exports = mongoose.model('questions', groupQuestionSchema)
