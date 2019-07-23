const router = require('koa-router')()
// var allVideos = require('../crawler/allVideos.json')
// var allCarousels = require('../crawler/allCarousels.json')
// const Movielist = require('../model/movielist')
const Carousels = require('../model/carousels')


router.get('/', async (ctx, next) => {
  // 导入视频数据
  // let movielist = await Movielist.find({}).exec()
  // if (!movielist.length) Movielist.insertMany(allVideos)
  //  导入音频数据
  // let carousels = await Carousels.find({}).exec()
  // if (!carousels.length) Carousels.insertMany(allCarousels)
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

// 获取轮播图
router.get('/carousel', async (ctx, next) => {
  let data = await Carousels.find({})
  if(data) {
    console.log(data)
    ctx.body = {
      code: 0,
      data: data
    }
  }
})

module.exports = router
