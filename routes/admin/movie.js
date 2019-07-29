const fs = require('fs')
const path = require('path')
const url = require('url')
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
  const url = `/uploads/movie/${newpath}${newpath?'/':''}${name}`
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
      code: 0,
      message: '该文件已经存在',
      path: comm.baseUrl+url
    } 
  }
})

// 删除某图片
router.post('/delPlotPics', async (ctx) => {
  const delPath = ctx.request.body.path
  const dir = url.parse(delPath,true).pathname
  const delDir = path.join(__dirname, '../../public'+dir)
  if( fs.existsSync(delDir) ) {
    try {
      fs.unlinkSync(delDir)
      ctx.body = { code: 0, data: { path: delDir }, message: '删除成功！' }
    } catch (err) {
      ctx.body = { code: -1, data: {}, message: '删除失败！' }
    }
  } else {
    ctx.body = { code: -1, data: {}, message: '未发现该文件' }
  }
})

// 提交影片
router.post('/createMovie', async (ctx) => {
  const data = ctx.request.body
  const {
    path,
    name,
    score,
    prisedCounts,
    basicInfo,
    originalName,
    releaseDate,
    totalTime,
    plotDesc,
    plotPics,
    trailer,
    cover,
    poster
  } = ctx.request.body
  if(path&&
    name&&
    score&&
    prisedCounts&&
    basicInfo&&
    originalName&&
    releaseDate&&
    totalTime&&
    plotDesc&&
    plotPics.length&&
    trailer&&
    cover&&
    poster) {
      ctx.body = {
        code: 0,
        path,
        name,
        score,
        prisedCounts,
        basicInfo,
        originalName,
        releaseDate,
        totalTime,
        plotDesc,
        plotPics,
        trailer,
        cover,
        poster, 
        message: '成功' 
      }
      
    } else {
      ctx.body = {
        code: -1,
        data,
        message: '请传入全部所需参数'
      }
    }
})

module.exports = router
