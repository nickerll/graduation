
var mongoose = require('mongoose')

var newsSchema = new mongoose.Schema({
  newsTitle:String,
  releaseDate:String,
  releaseCon:String,
  newsimg:String
})

module.exports = mongoose.model("news",newsSchema,"news")
