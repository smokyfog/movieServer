var mongoose=require('./db.js');
var Schema=mongoose.Schema;

var Movielist = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String
  },
  poster: {
    type: String
  },
  cover: {
    type: String
  },
  trailer: {
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
  directors: {
    type: String
  },
  actors: {
    type: String
  },
  plotPics: {
    type: String
  },
  createTime: {
    type: String
  }
})


module.exports=mongoose.model('Movielist',Movielist,'movelist');