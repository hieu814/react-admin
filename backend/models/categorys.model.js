const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
	{
		name: { type: String , trim: true },
        type: { type: Number, required: true, trim: true , default: 1},
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: null
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: null
        }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('articles', articleSchema)
