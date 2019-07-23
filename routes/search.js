const router = require('koa-router')()
const Movielist = require('../model/movielist')

router.prefix('/search')

router.get('/', async (ctx) => {
  ctx.redirect('/list');
})

router.get('/list', async (ctx, next) => {
  let { page=1, pageSize=10, keywords } = ctx.query
  let reg = ''
  if(keywords){
    reg = new RegExp(keywords, 'i')
  }
  let json = await Movielist.find(
    {
      $or : [{name : {$regex : reg}}]
    })
    .skip((parseInt(page)-1) * parseInt(pageSize))
    .limit(parseInt(pageSize))

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
