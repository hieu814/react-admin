const mongoose = require('mongoose')
const{passageSchema,questionSchema} = require('./question.data.model')
const groupQuestionSchema = new mongoose.Schema(
	{
		type: { type: Number, required: true, default: 1 },
		group: {
			from: { type: Number, required: true, default: 1 },
			to: { type: Number, required: true, default: 1 }
		},
		passages: [passageSchema],
		questions: [questionSchema],
		image: { type: String, trim: true },
		audio: { type: String, trim: true },
	}
)


module.exports = mongoose.model('questions', groupQuestionSchema)
