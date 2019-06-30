module.exports = app => {
    const express = require("express")
    const router = express.Router({
        mergeParams: true
    })

    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.get('/', async (req, res) => {

        const queryOption = {}
        if(req.Model.modelName === 'Category'){
            queryOption.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOption).limit(10)
        res.send(items)
    })
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id)
        res.send(model)
    })

    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
        console.log(model)
    })

    app.use('/admin/api/rest/:resource', async (req, res, next)=> {
const modelName = require('inflection').classify(req.params.resource)
req.Model = require(`../../models/${modelName}`)
next()
    }, router)
}