const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
	exams: [{ type: mongoose.Schema.Types.ObjectId, trim: true, ref: 'exams' }],
	name: { type: String, required: true, trim: true },
	description: { type: String, trim: true },
},{ timestamps: true }
)

module.exports = mongoose.model('groupexams', groupSchema)
