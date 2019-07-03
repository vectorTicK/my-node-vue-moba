const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type:String},
    avatar: {type:String},
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }
})

module.exports = mongoose.model('Hero', schema)