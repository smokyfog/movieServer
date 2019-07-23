const router = require('koa-router')()
const Carousels = require('../model/carousels')
const Movielist = require('../model/movielist')

router.prefix('/movie')

// 获取轮播图
router.get('/carousel', async (ctx) => {
  let data = await Carousels.find({})
  if(data) {
    ctx.body = {
      code: 0,
      data: data
    }
  } else {
    ctx.body = {
      code: -1,
      data: [],
      message: '查询失败'
    }
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

module.exports = router