
var mongoose = require('mongoose')

var sceneSchema = new mongoose.Schema({
  title:String,
  sceneLogo:String,
  describe:String,
  createData:String
})

module.exports = mongoose.model("scene",sceneSchema,"scene")
