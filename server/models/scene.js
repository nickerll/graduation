
var mongoose = require('mongoose')

var sceneSchema = new mongoose.Schema({
  title:String,
  sceneLogo:String,
  describe:String,
  createData:String,
  leavemessage:Array
})

module.exports = mongoose.model("scene",sceneSchema,"scene")
