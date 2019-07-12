const mongoose = require('mongoose')
require('./Category')
const schema = new mongoose.Schema({
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    title: {
        type: String
    },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    scores: {
        difficult: {
            type: Number
        },
        skills: {
            type: Number
        },
        attack: {
            type: Number
        },
        survive: {
            type: Number
        }
    },
    skills: [{
        name: {
            type: String
        },
        icon: {
            type: String
        },
        description: {
            type: String
        },
        tips: {
            type: String
        },
    }],
    items1: [{
        item: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Item'
        },
    }],
    items2: [{
        item: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Item'
        },
    }],
    usageTips: {
        type: String
    },
    teamTips: {
        type: String
    },
    partners:[{
        hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
        description: {type: String}
    }]

})

module.exports = mongoose.model('Hero', schema)