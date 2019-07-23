var mongoose=require('./db.js');
var Schema=mongoose.Schema;

var Actor = new Schema({
  id: {
    type: String,
  },
  staffId: {
    type: String
  },
  name: {
    type: String
  },
  sex: {
    type: Number
  },
  photo: {
    type: String
  },
  role: {
    type: Number
  },
  actName: {
    type: String
  }
})


module.exports=mongoose.model('Actor',Actor,'actor');