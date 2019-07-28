const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const comm = require('../../comm/comm')
const Movielist = require('../../model/movielist')

router.prefix('/movie')

router.get('/', function (ctx, next) {
  ctx.body = '管理员影片页!'
})

// 影片列表
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

// 提交影片
router.post('/putMovie', async (ctx) => {
  const newpath = ctx.request.body.path
  const file = ctx.request.files.file
  const name = file.name
  const newDirPath = path.join(__dirname, '../../public/uploads/movie'+'/'+newpath)
  const newFilePath = path.join(__dirname, '../../public/uploads/movie/'+newpath+'/'+name)
  const url = '/uploads/movie/'+newpath+'/'+name
  if( !fs.existsSync(newFilePath) ) {
    comm.makeDir(newDirPath)
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(newFilePath)
    reader.pipe(upStream)
    ctx.body = {
      code: 0,
      message: '上传成功',
      path: comm.baseUrl+url
    } 
  } else {
    ctx.body = {
      code: -1,
      message: '该文件已经存在',
      path: comm.baseUrl+url
    } 
  }
})

module.exports = router
