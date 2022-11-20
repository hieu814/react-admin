const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
	users: { type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'users' },
	category: { type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'exam_category' },
	questions: [{ type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'questions' ,default: []}],
	name: { type: String, trim: true },
	description: { type: String, trim: true },
},{ timestamps: true }
)

module.exports = mongoose.model('exams', examSchema)
