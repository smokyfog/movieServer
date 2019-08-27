const router = require('koa-router')()
const User = require('../model/user')
const axios = require('axios')
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

router.post('/mpWXLogin/:code', async (ctx) => {
    const { code } = ctx.params
    const { avatarUrl, nickName, whichMP } = ctx.request.body
    const appid = 'wxf702909ea55035a0'
    const secret = 'f4125aa517c2ea67d9ecb15d08294543'
    let token = new Date().getTime()+Math.random().toString(36).substr(2)
    const res = await axios.get('https://api.weixin.qq.com/sns/jscode2session',{
        params: {
            appid,
            secret,
            js_code: code,
            grant_type: 'aythorization_code'
        }
    })
    if( !res.data.openid ) return ctx.body = { code: 1, msg: '注册失败' }; 
    const appWxOpenId = res.data.openid
    const result = await User.find({appWxOpenId})
    if( result.length ) {
        let data = await User.findOne({ appWxOpenId },{ password: 0 })
        ctx.body = { code: 0, data: data, message:'登陆成功' }
    } else {
        const registTime = new Date()
        const id = Math.random().toString(36).substr(2)+new Date().getTime()
        var addUser = new User({
            id: id,
            username: nickName,
            nickname: nickName,
            password: '',
            registTime,
            faceImage: avatarUrl
        })
        let result = await addUser.save()
        if ( result ) {
            let userinfo = await User.findOne({ id }, { password: 0 })
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
    let { headeruserid, headerusertoken } = ctx.request.header
    let result = await User.findOne({ id: headeruserid, userUniqueToken: headerusertoken})
    if(result){
        let dirPath = path.resolve(__dirname, '../public/uploads')
        let oldname = result.faceImage.split('/').pop()
        let oldpath = dirPath +'/'+ oldname
        const file = ctx.request.files.file
        const reader = fs.createReadStream(file.path)
        let newName = new Date().getTime()+file.name
        let newFilePath = path.join(__dirname, '../public/uploads/')+newName
        const upStream = fs.createWriteStream(newFilePath)
        reader.pipe(upStream)
        let resetPath = await User.update(
            { id: headeruserid },
            { faceImage: 'http://129.28.187.206:3001/uploads/'+newName }
        )
        if(resetPath){
            let userinfo = await User.findOne({ id: headeruserid },{ username: 0 })
            ctx.body = { code: 0, message: '上传成功', data: userinfo }
            if( fs.existsSync(oldpath) ) {
                fs.unlinkSync(oldpath)
            }
        } else {
            ctx.body = { code: -1, message: '上传失败,请重试', data: [] }
        }
    } else {
        ctx.body = { code: -1, message: '更换图标失败,请重新登陆后再次尝试', data: [] }
    }
})

module.exports = router