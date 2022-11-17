const mongoose = require('mongoose')

const passagesSchema = new mongoose.Schema({
    order:{ type: Number, default: 1 },
    content: { type: String, trim: true },
    image: { type: String, trim: true },
})

module.exports = mongoose.model('passage', passagesSchema)
