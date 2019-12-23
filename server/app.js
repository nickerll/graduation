
var express = require('express')
var app = new express()

var fs = require('fs')
var multer = require('multer')  //引入文件上传中间件
// var upload = multer({dest:'./upload'}) //设置上传的文件保存的目录

var router = require('./router/user')


//为了解析http中json和x-www-urlencoded类型的数据，需要引入body-parser中间件
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends:false}))

//处理跨域
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","X-Requested-With,Content-Type")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    next()
})

var createFolder = function (folder) {
	try{
		fs.accessSync(folder)
	}catch(e){
		//TODO handle the exception
		fs.mkdirSync(folder)
	}
}
var uploadFolder = './upload'
createFolder(uploadFolder)
//通过filename属性定制
var storage = multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,uploadFolder)	//保存的路径
	},
	filename:function(req,file,cb){
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth()+1
    var day = d.getDate() < 10?'0'+d.getDate():''+d.getDate()
    var hour = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var now = year+month+day+hour+minutes+seconds
    // console.log(year)
    // console.log(month)
    // console.log(day)
    // console.log(hour)
    // console.log(minutes)
    // console.log(seconds)
    // console.log(now)
		//将保存文件名设置为 字段名+时间戳+后缀（.jpeg/.png.....）
		console.log(file.mimetype.split('/')[1])
		cb(null,file.fieldname+'-'+now+'.'+file.mimetype.split('/')[1])
	}
})
var upload = multer({storage:storage})
//图片上传
app.post('/uploadfile',upload.single('file'),function(req,res,next){
  res.header("Access-Control-Allow-Origin","*")
  console.log(__dirname)//C:\Users\Administrator\Desktop\123456\graduation\server
  console.log(__filename)//C:\Users\Administrator\Desktop\123456\graduation\server\app.js
	console.log(req.file)
	res.json({
		code:2,
		message:"success",
    path:req.file.path
	})
})

app.use('/users',router)    //将路由注册到/users的路径下

//连接数据库
var url = "mongodb://localhost:27017/graduation"
var mongoose = require('mongoose')
mongoose.connect(url,(err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('db connect success')
    }
})

// var users = [
//     { name:'admin',password:'123456'},
//     { name:'nickerll',password:'456789'}
// ]

// app.post('/admin',(req,res) => {
//     var user = users.find((item) => {
//                 return item.name == req.body.name && item.password == req.body.password
//             })
//             res.json(user?user:{})
//             // console.log(req.body)
//             // res.send(users)
// })

//process.env.PORT是用来读取当前目录下环境变量port的值
var port = process.env.PORT || 3000

app.listen(port)

console.log('app is listening on port:' + port)
