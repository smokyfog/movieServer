var mongoose=require('../db.js');
var Schema=mongoose.Schema;

// 生成id
let ObjectId = Schema.Types.ObjectId;

var SmallVideo = new Schema({
  path: {
    type: String
  },
  name: {
    type: String
  },
  score: {
    type: Number
  },
  basicInfo: {
    type: String
  },
  plotDesc: {
    type: String
  },
  trailer: {
    type: String
  },
  cover: {
    type: String
  },
  userid: ObjectId,
  praiseCount: {
    type: Number,
    default: 0
  },
  type: {
    type: Number,
    default: 1
  },
}, {
  // 加入该配置项，会自动生成创建时间
  // 在文档更新时，也会自动更新时间
  timestamps: {
      createdAt: 'create_time',
      updatedAt: 'update_time'
  }
})


module.exports=mongoose.model('SmallVideo', SmallVideo, 'smallvideo');