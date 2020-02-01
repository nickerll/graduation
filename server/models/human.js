
var mongoose = require('mongoose')

var humanSchema = new mongoose.Schema({
  title:String,
  humanimg:String,
  humandesc:String,
  leavemessage:Array
})
module.exports = mongoose.model("human",humanSchema,"human")