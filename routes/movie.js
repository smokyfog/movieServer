const router = require('koa-router')()
const Carousels = require('../model/carousels')

router.prefix('/movie')

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

module.exports = router