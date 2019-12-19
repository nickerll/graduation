
var mongoose = require('mongoose')

var humanSchema = new mongoose.Schema({
  title:String,
  humanimg:String,
  humandesc:String
})
module.exports = mongoose.model("human",humanSchema,"human")