var mongoose=require('../db.js');
var Schema=mongoose.Schema;

// 生成id
let ObjectId = Schema.Types.ObjectId;

var Movie = new Schema({
  id: ObjectId,
  path: {
    type: String
  },
  name: {
    type: String
  },
  score: {
    type: Number
  },
  prisedCounts: {
    type: Number
  },
  basicInfo: {
    type: String
  },
  originalName: {
    type: String
  },
  releaseDate: {
    type: String
  },
  totalTime: {
    type: String
  },
  plotDesc: {
    type: String
  },
  plotPics: {
    type: String
  },
  cover: {
    type: String
  },
  trailer: {
    type: String
  },
  poster: {
    type: String
  },
  type: {
    type: String
  },
}, {
  // 加入该配置项，会自动生成创建时间
  // 在文档更新时，也会自动更新时间
  timestamps: {
      createdAt: 'create_time',
      updatedAt: 'update_time'
  }
})


module.exports=mongoose.model('Movie', Movie, 'movie');