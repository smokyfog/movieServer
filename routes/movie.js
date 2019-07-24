const router = require('koa-router')()
const Carousels = require('../model/carousels')
const Movielist = require('../model/movielist')
const Director = require('../model/director')
const Actor = require('../model/actor')

router.prefix('/movie')

// 获取轮播图
router.get('/carousel', async (ctx) => {
  let data = await Carousels.find({})
  if(data) {
    ctx.body = { code: 0, data: data }
  } else {
    ctx.body = { code: -1, data: [], message: '查询失败' }
  }
})

// 获取热门内容
router.post('/hot', async (ctx) => {
  let { type } = ctx.request.body
  if(type == 'superhero') {
    var data = await Movielist.aggregate([
      { $sort:{ 'score': -1 } },
      { $limit:8 }
    ])
    ctx.body = { code: 0, data: data }
  } else if (type == 'trailer') {
    var data = await Movielist.aggregate([
      { $sort:{ 'score': 1 } },
      { $limit: 4 }
    ])
    ctx.body = { code: 0, data: data }
  } else {
    ctx.body = { code: -1, data: [], message:'请输入要查询的内容' }
  }
})

// 猜你喜欢
router.get('/guessULike', async (ctx) => {
  let data = await Movielist.aggregate([
    { $sample: { size: 5 } }
  ])
  if(data){
    ctx.body = { code: 0, data: data }
  } else {
    ctx.body = { code: -1, data: [], message:'查询失败' }
  }
})

// 根据视频id获取视频详情
router.get('/trailer/:id', async(ctx) => {
  let { id } = ctx.params
  let data = await Movielist.findOne({ id: id })
  if(data){
    ctx.body = {
      code: 0,
      data: data
    }
  }else{
    ctx.body = {
      code: -1,
      message:'未查询到数据',
      data: []
    }
  }
})

// 根据视频id获取视频的导演
router.get('/trailer/:id/:type', async(ctx) => {
  let { id, type } = ctx.params
  console.log(id, type)
  let data = ''
  if(type === '1') {
    data = await Director.find({ id: id })
  } else if (type === '2') {
    data = await Actor.find({ id: id })
  } else {
    ctx.body = { code: -1, message:'请输入指定任务类型', data: [] }
  }
  
  if(data.length){
    ctx.body = { code: 0, data: data }
  }else{
    ctx.body = { code: -1, message:'未查询到数据', data: [] }
  }
})


module.exports = router