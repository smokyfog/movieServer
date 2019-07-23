const fs =  require('fs') 
const rp = require('request-promise');
const _ = require('lodash')
const http = require('http')

// const getAllVideos = async (page = 1) => {
//     var res = await request(`https://www.imovietrailer.com/superhero/search/list?keywords=&page=%201&pageSize=15&qq=lee39471711`)
// }

// 爬取所有影片的相关数据

// var _allVideos = []
// const getAllVideos = async (page = 1) => {
//   var options = {
//     method: 'POST',
//     header:{
//       'content-type':'application/x-www-form-urlencoded'
//     },
//     uri: 'https://www.imovietrailer.com/superhero/search/list',
//     qs: {
//       keywords: '',
//       page: page,
//       pageSize: 15,
//       qq:"lee39471711"
//     }
//   }
//   var res = await rp(options)
//   var json = JSON.parse(res).data.rows
//   _allVideos = _.union(_allVideos, json)
//   console.log('当前正在爬取'+json.length)
//   console.log('当前已经爬取'+_allVideos.length+'条数据')
//   if(!json.length){
//     fs.writeFileSync('./allVideos.json', JSON.stringify(_allVideos, null, 4), 'utf8')
//     console.log('写入完成！')
//     return
//   }else {
//     page++
//     getAllVideos(page)
//   }
// }

// getAllVideos()




// 根据爬取的影片的相关数据对视频进行下载
// const doc = fs.readFileSync('./allVideos.json', 'utf-8')
// var downdoc = JSON.parse(doc)
// var i = 0

// var downloadVideo = async video => {
  
//   if (!fs.existsSync(`./${video.title}.mp4`)) {
//     await getVideoData(video.src, 'binary').then(fileData => {
//       console.log('下载视频中：', video.title)
//       savefileToPath(video.title, fileData).then(res =>{
//         console.log(`${res}: ${video.title}`)
//       })
//     })
//   } else {
//     console.log(`视频文件已存在：${video.title}`)
//   }

//   if(i===downdoc.length){
//     console.log('全部下载完成')
//     return
//   }else{
//     ++i
//     console.log('正在下载第'+i+'个视频')
//     var data = downdoc[i]
//     var json = {
//       src:data.trailer,
//       title:data.name
//     }
//     downloadVideo(json)
//   }
// }

// var getVideoData =  (url, encoding) => {
//   return new Promise((resolve, reject) => {
//     let req = http.get(url, function (res) {
//       let result = ''
//       encoding && res.setEncoding(encoding)
//       console.log('获取数据中...')
//       res.on('data', function (d) {
//         result += d
//       })
//       res.on('end', function () {
//         resolve(result)
//       })
//       res.on('error', function (e) {
//         reject(e)
//       })
//     })
//     req.end()
//   })
// }

// var savefileToPath = (fileName, fileData) => {
//   let fileFullName = `./${fileName}.mp4`
//   return new Promise((resolve, reject) => {
//     fs.writeFile(fileFullName, fileData, 'binary', function (err) {
//       if (err) {
//         console.log('savefileToPath error:', err)
//       }
//       resolve('已下载')
//     })
//   })
// }

// var data = downdoc[i]
// var json = {
//   src:data.trailer,
//   title:data.name
// }
// downloadVideo(json)




// 爬取轮播图数据

var _allCarousels = []
const getAllCarousels = async () => {
  var options = {
    method: 'POST',
    header:{
      'content-type':'application/x-www-form-urlencoded'
    },
    uri: 'https://www.imovietrailer.com/superhero/index/carousel/list',
    qs: {
      qq:"lee67669454"
    }
  }
  var res = await rp(options)
  var json = JSON.parse(res).data
  _allCarousels = _.union(_allCarousels, json)
  console.log('当前正在爬取'+json.length)
  console.log('当前已经爬取'+_allCarousels.length+'条数据')
  fs.writeFileSync('./allCarousels.json', JSON.stringify(_allCarousels, null, 4), 'utf8')
  console.log('写入完成！')
}

getAllCarousels()