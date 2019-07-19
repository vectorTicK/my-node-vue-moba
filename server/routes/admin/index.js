module.exports = app => {

    const express = require("express")
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        mergeParams: true
    })

    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.get('/hero_categories', async (req, res) => {
        const heroId = await req.Model.find({
            name: '英雄'
        })
        const items = await req.Model.find({
            parent: heroId
        })
        res.send(items)
    })

    router.get('/article_categories', async (req, res) => {
        const parentId = await req.Model.find({
            name: '新闻分类'
        })
        const items = await req.Model.find({
            parent: parentId
        })
        res.send(items)
    })

    router.get('/', async (req, res) => {
        const queryOption = {}
        if (req.Model.modelName === 'Category') {
            queryOption.populate = 'parent'
        }
        if (req.Model.modelName === 'Hero') {
            queryOption.populate = 'categories'
        }
        const items = await req.Model.find().setOptions(queryOption)

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
    })

    const authMiddleware = require('../../middleware/auth')

    const resourceMiddleware = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware()
       , router)


    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password
        } = req.body
        // 1. 根据用户名找用户
        const user = await AdminUser.findOne({
            username
        }).select('+password')
        assert(user, 422, '用户不存在')
        // 2. 校验密码
        assert(password, 422, '密码不能为空 ')
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')
        // 3. 返回token

        const token = jwt.sign({
            _id: user._id,
            username: user.username
        }, app.get('secret'))
        res.send({
            token
        })
    })

    // error handle
    app.use(async (err, req, res, next) => {
        console.log(err.statusCode)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}