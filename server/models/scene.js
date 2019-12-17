
var mongoose = require('mongoose')

var sceneSchema = new mongoose.Schema({
  title:String,
  sceneLogo:String,
  secAlbumList:[
    title:String,
    secimages:String,
    describe:String
  ],
  describe:String
})

module.exports = mongoose.model("scene",sceneSchema)