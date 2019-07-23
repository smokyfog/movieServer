const router = require('koa-router')()
// var allVideos = require('../crawler/allVideos.json')
// var allCarousels = require('../crawler/allCarousels.json')
var allActor = require('../crawler/allActor.json')
var allDirector = require('../crawler/allDirector.json')
// const Movielist = require('../model/movielist')
const Carousels = require('../model/carousels')

const Actor = require('../model/actor')
const Director = require('../model/director')


router.get('/', async (ctx, next) => {
  // 导入视频数据
  // let movielist = await Movielist.find({}).exec()
  // if (!movielist.length) Movielist.insertMany(allVideos)
  //  导入音频数据
  // let carousels = await Carousels.find({}).exec()
  // if (!carousels.length) Carousels.insertMany(allCarousels)
  //  导入导演数据
  let director = await Director.find({}).exec()
  if (!director.length) Director.insertMany(allDirector)
  //  导入演员数据
  let actor = await Actor.find({}).exec()
  if (!actor.length) Actor.insertMany(allActor)

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
