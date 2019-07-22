const router = require('koa-router')()
var list = require('../crawler/allVideos.json')
const Movielist = require('../model/movielist')


router.get('/', async (ctx, next) => {
  // let movielist = await Movielist.find({}).exec()
  // if (!movielist.length) Movielist.insertMany(list)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
