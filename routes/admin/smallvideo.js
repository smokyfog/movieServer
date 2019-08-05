const router = require('koa-router')()
const comm = require('../../comm/comm')
const SmallVideo = require('../../model/admin/smallvideo')

router.prefix('/smallvideo')

router.post('/add', async (ctx) => {
    let { path, name, score, basicInfo, plotDesc, trailer, cover, userid, praiseCount, type } = ctx.request.body
    let smallvideo = new SmallVideo({
        path,
        name,
        score,
        basicInfo,
        plotDesc,
        userid,
        praiseCount,
        type,
        trailer: comm.getUrlDir(trailer),
        cover: comm.getUrlDir(cover),
    })
    let result = await smallvideo.save()
    if (result) {
        ctx.body = {
            code: 0,
            data: result,
            message: '上传成功'
        }
    } else {
        ctx.body = {
            code: -1,
            data: [],
            message: '上传失败'
        }
    }
})

router.get('/list', async (ctx) => {
    let result = await SmallVideo.find({})
    if (result.length) {
        result.map(item => {
            item.trailer = comm.baseUrl+item.trailer
            item.cover = comm.baseUrl+item.cover
        })
        ctx.body = {
            code: 0,
            message: 'succ',
            data: result
        }
    } else {
        ctx.body = {
            code: -1,
            message: '未找到数据',
            data: []
        }
    }
})

module.exports = router
