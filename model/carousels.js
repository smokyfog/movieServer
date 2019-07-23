var mongoose=require('./db.js');
var Schema=mongoose.Schema;

var Carousel = new Schema({
  id: {
    type: String,
  },
  movieId: {
    type: String
  },
  image: {
    type: String
  },
  sort: {
    type: Number
  },
  isShow: {
    type: Number
  }
})


module.exports=mongoose.model('Carousel',Carousel,'carousel');