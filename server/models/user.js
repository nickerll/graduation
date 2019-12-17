
var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name:String,
    pwd:String,
    old:String,
    sex:String,
    address:String
})

module.exports = mongoose.model("user",userSchema)
