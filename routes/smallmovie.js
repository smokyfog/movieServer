const router = require('koa-router')()
const smallvideo = require('../model/admin/smallvideo')
const User = require('../model/user')

router.prefix('/smallmovie')

router.get('/list', async (ctx) => {
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
        }
    ])
    ctx.body = {
        code: 1,
        data: data
    }
})

module.exports = router