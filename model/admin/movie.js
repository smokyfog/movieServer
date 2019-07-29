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
  }
})


module.exports=mongoose.model('Movie',Movie,'movie');