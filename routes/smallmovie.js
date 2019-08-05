const router = require('koa-router')()
const smallvideo = require('../model/admin/smallvideo')
const comm = require('../comm/comm')
const User = require('../model/user')

router.prefix('/smallmovie')

router.get('/list', async (ctx) => {
        let { page=1, pageSize=10 } = ctx.query
        let data = await smallvideo.aggregate([
        {
            $lookup: {
                from: "user",
                localField: 'userid',
                foreignField: '_id',
                as: 'userinfo'
            }
        },
        {
            $project:{ 'userinfo.password': 0 }
        },
        {
            $project: { 
                trailer: { $concat: [comm.baseUrl, "$trailer"] },
                cover: { $concat: [comm.baseUrl, "$cover"] },
                userinfo: 1,
                name: 1
            }
        },
        {
            $skip: (parseInt(page)-1) * parseInt(pageSize)
        },
        {
            $limit: parseInt(pageSize)
        }
    ])
    ctx.body = {
        code: 1,
        data: data
    }
})

module.exports = router