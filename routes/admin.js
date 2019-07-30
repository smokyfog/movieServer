const router = require('koa-router')()
const movie = require('./admin/movie')
const user = require('./admin/user')
const smallvideo = require('./admin/smallvideo')

router.prefix('/admin')

router.get('/', function(ctx, next){
    ctx.body = "欢迎来到影片后台系统"
})

router.use(movie.routes(), movie.allowedMethods())
router.use(user.routes(), user.allowedMethods())
router.use(smallvideo.routes(), smallvideo.allowedMethods())
module.exports = router