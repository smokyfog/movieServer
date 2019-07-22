const router = require('koa-router')()
const Movielist = require('../model/movielist')

router.prefix('/search')

router.get('/', async (ctx) => {
  ctx.redirect('/list');
})

router.get('/list', async (ctx, next) => {
    let {page=1, pageSize=10, keywords=''} = ctx.query
    const reg = new RegExp(keywords, 'i')
    let json = await Movielist.find(
        {
          $or : [{name : {$regex : reg}}]
        },
        {
          skip:parseInt(page-1)  * parseInt(pageSize)
        },
        {
          limit: parseInt(pageSize)
        })
    if(json.length){
      ctx.body = {
        code:0,
        data:json
      }
    }else{
      ctx.body = {
        code:-1,
        msg:'未查到数据',
        data:[]
      }
    }
    
})

module.exports = router
