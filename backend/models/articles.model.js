const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
	{
		name: { type: String , trim: true },
        thumbail: { type: String , trim: true },
		content:  { type: String , trim: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: null
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: null
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'article_categories',
            default: null
        }
	},
	{ timestamps: true }
)

module.exports = mongoose.model('articles', articleSchema)
