const router = require('koa-router')()
const User = require('../../model/user')

router.prefix('/user')

router.get('/list', async (ctx) => {
    let userlist = await User.find({"type": 99},{ password: 0 })
    if (userlist.length) {
        ctx.body = {
            code: 0,
            message: 'suc',
            data: userlist
        }
    } else {
        ctx.body = {
            code: -1,
            message: '查询失败',
            data: []
        }
    }
    
})


module.exports = router
