const router = require('koa-router')()
const Movielist = require('../model/movielist')

router.prefix('/search')

router.get('/', async (ctx, next) => {
    let json = await Movielist.findOne({name:"X战警：黑凤凰"})
    ctx.body = {
        code:0,
        data:json
    }
})

module.exports = router
