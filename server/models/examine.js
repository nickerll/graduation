

var mongoose = require('mongoose')

var examineSchema = new mongoose.Schema({
    name:String,
    pwd:String
})

module.exports = mongoose.model("examine",examineSchema,"examine")