const router = require('koa-router')()
const SmallVideo = require('../../model/admin/smallvideo')

router.prefix('/smallvideo')

router.post('/add', async (ctx) => {
    let data = ctx.request.body
    ctx.body = {
        code: -1,
        data: data,
        message: ''
    }
})

module.exports = router
