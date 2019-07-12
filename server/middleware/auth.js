const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const AdminUser = require('../models/AdminUser')
module.exports = option => {
    return async (req, res, next) => {
        assert(req.headers.authorization, 401, '请登录')
        const token = (String(req.headers.authorization) || '').split(' ').pop()
        const {
            _id
        } = jwt.verify(token, req.app.get('secret'))
        assert(_id, 401, '请登录')
        req.user = await AdminUser.findById(_id)
        assert(req.user, 401, '请登录')

        await next()
    }
}