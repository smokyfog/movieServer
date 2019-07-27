const router = require('koa-router')()
const movie = require('./admin/movie')

router.prefix('/admin')

router.get('/', function(ctx, next){
    ctx.body = "欢迎来到影片后台系统"
})

router.use(movie.routes(), movie.allowedMethods())
module.exports = router