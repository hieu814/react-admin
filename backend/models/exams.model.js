const mongoose = require('mongoose')

const examSchema = new mongoose.Schema({
	users: { type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'users' },
	name: { type: String, required: true, trim: true },
	description: { type: String, trim: true },
	parts: [{ type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'parts' }],
},{ timestamps: true }
)

module.exports = mongoose.model('exams', examSchema)
