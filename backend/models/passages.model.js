const mongoose = require('mongoose')

const passagesSchema = new mongoose.Schema({
    paragraph: { type: String, trim: true },
    image: { type: String, trim: true },
})

module.exports = mongoose.model('passages', passagesSchema)
