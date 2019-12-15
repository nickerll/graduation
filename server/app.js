
var express = require('express')
var app = new express()

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