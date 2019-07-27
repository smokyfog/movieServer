const router = require('koa-router')()
const Movielist = require('../../model/movielist')

router.prefix('/movie')

router.get('/', function (ctx, next) {
  ctx.body = '管理员影片页!'
})

router.get('/list', async (ctx) => {
  let { page=1, page_size=10, keywords } = ctx.query
  let reg = ''
  if(keywords){reg = new RegExp(keywords, 'i')}
  let json = await Movielist.find(
    {
      $or : [{name : {$regex : reg}}]
    })
    .skip((parseInt(page)-1) * parseInt(page_size))
    .limit(parseInt(page_size))

  let count = await Movielist.find(
    {
      $or : [{name : {$regex : reg}}]
    }).count()

  if(json.length){
    ctx.body = {
      code:0,
      total:count,
      rows:json
    }
  }else{
    ctx.body = {
      code:-1,
      msg:'未查到数据',
      total:0,
      rows:[]
    }
  }
})

module.exports = router
