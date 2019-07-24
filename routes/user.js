const router = require('koa-router')()
const User = require('../model/user')
const multer=require('koa-multer')
const fs = require('fs')
const path = require('path')


router.prefix('/user')

// 注册登陆的统一逻辑
router.post('/registOrLogin', async (ctx) => {
    console.log(ctx.request.body)
    let { username, password } = ctx.request.body
    let data =await User.findOne({username:username})
    let token = new Date().getTime()+Math.random().toString(36).substr(2)
    if(data) {
        let islogin = await User.findOne({ username, password })
        if(islogin) {
            let result = await User.update({ username }, {userUniqueToken:token})
            if(result){
                let data = await User.findOne({ username, password },{ password: 0 })
                ctx.body = { code: 0, data: data, message:'登陆成功' }
            } else {
                ctx.body = { code: -1, data: [], message:'生成用户token失败' }
            }
        }else {
            ctx.body = { code: -1, data: {}, message:'密码错误' }
        }
    }else{
        var addUser = new User({
            id: Math.random().toString(36).substr(2)+new Date().getTime(),
            username: username,
            password: password,
            userUniqueToken: token
        })
        let result = await addUser.save()
        if(result) {
            let userinfo = await User.findOne({ username, password }, { password: 0 })
            ctx.body = { code: 0, message: '新建账号成功', data: userinfo }
        } else {
            ctx.body = { code: -1, message: '创建账号失败', data: []}
        }
    }
})


// 修改昵称
router.post('/modifyUserinfo', async (ctx) => {
    let { userId } = ctx.request.body
    let update = ctx.request.body
    delete update['userId']
    console.log(update)
    let { headeruserid, headerusertoken } = ctx.request.header
    let result = await User.update(
        { id:userId, userUniqueToken:headerusertoken },
        { ...update }
    )
    if(result){
        let userinfo = await User.findOne({ id:userId }, { password: 0 })
        ctx.body = { code: 0, data: userinfo, message: '修改名称成功' }
    } else {
        ctx.body = { code: -1, data: [], message: '修改名称失败，请重新登陆查询' }
    }
})

// 上传文件

// 方法一
// var storage = multer.diskStorage({
//     //文件保存路径
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads/')
//     },
//     //修改文件名称
//     filename: function (req, file, cb) {
//         var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
//         cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// })
// //加载配置
// var upload = multer({ storage: storage });

// router.post('/uploadFace',upload.single('file'), async (ctx) => {
//     ctx.body = {
//         filename: 'http://localhost:3000/uploads/'+ctx.req.file.filename//返回文件名
//     }
// })

// 方法二
router.post('/uploadFace',async (ctx) => {
    const file = ctx.request.files.file
    const reader = fs.createReadStream(file.path)
    let name = new Date().getTime()+file.name
    let filePath = path.join(__dirname, '../public/uploads/')+name
    const upStream = fs.createWriteStream(filePath)
    reader.pipe(upStream)
    ctx.body = {
        code: 0,
        message: '上传成功',
        filename: 'http://localhost:3000/uploads/' + name
    }
})

module.exports = router