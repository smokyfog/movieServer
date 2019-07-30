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
        trailer: comm.getUrlDir(cover),
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

module.exports = router
