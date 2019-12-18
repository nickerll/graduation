

var express = require('express')
var router = express.Router()

var User = require('../models/user') //存放数据的数据表
var Admin = require('../models/admin') //存放数据的数据表
var Scene = require('../models/scene.js') //存放景点的数据表
//定义返回变量格式
var resData;
router.use((req,res,next) => {
  resData = {
    code:0,
    message:''
  }
  next()
})

router.route('/admin').post((req,res) => {
    Admin.findOne({
        name:req.body.name,
        pwd:req.body.password
    },(err,admin) => {
        if (err) {
            console.log(err)
        }
        res.json(admin)
    })
})
//登录
router.route('/validate').post((req,res) => {
    User.find({
        name:req.body.name,
        pwd:req.body.password
    },(err,user) => {
        if(err){
            console.log(err)
        }
        res.json(user)
    })
})
//查询所有用户
router.route('/allusers').post((req,res) => {
  User.find().then((data) => {
    // console.log(data)
    res.json(data)
  })
})
//删除用户
router.route('/deleteuser').get((req,res) => {
  console.log({query:req.query,data:req.params,json:req.body})
  User.deleteOne(req.params).then((data) => {
    console.log(data)
    resData.code = 2
    resData.message = '删除成功'
    res.json(resData)
  })
})
//景点展示查询所有
router.route('/sceneAll').get((req,res) => {
  Scene.find().then((data) => {
    res.json(data)
  })
})
//景点展示-添加景点
router.route('/addScene').post((req,res) => { //定义接口为/addScene以及请求方式为get
  var addscen = new Scene({  //新建一个对象 把表单中的对应的数据赋值到对应的字段中
    title:req.body.title,
    sceneLogo:req.body.sceneLogo,
    describe:req.body.describe,
    createData:new Date().getTime()
  })
  console.log(new Date().getDate())
  addscen.save((err,data) => {  //将数据添加到数据库中
    if (err) {  //如果错误
      console.log(err)  //在终端输出错误
    }
    if (data) { //如果有值
      console.log("新添的数据")
      console.log(data) //在终端输出这条数据
      console.log('-----------------------')
    }
  })
  res.json(addscen)
})
//景点展示-删除景点
router.route('/deleScene').get((req,res) => {
  Scene.deleteOne(req.params).then((delsc) => {
    console.log(delsc)
    resData.code = 2
    resData.message = '删除成功'
    res.json(resData)
  })
})
//注册
router.route('/Register').post((req,res) => {  //注册路由
    User.findOne({      //在数据表中查找
        name:req.body.name, //是否有与输入框相同的账号
    }).then((data) => {
      console.log("查询结果"+data)
        if (data) {
          console.log('账号已注册')
          resData.code = 4
          resData.message = '账号已被注册'
          res.json(resData)
          return
        }
        var user = new User({
            name:req.body.name,
            pwd:req.body.password,
            old:req.body.old,
            sex:req.body.sex,
            address:req.body.address
        })
        user.save( (err,da) => {
            if(err){
                console.log("错误："+err)
            }
            if(da){
                console.log("这是"+da)
            }
        }) //存到数据表中
        res.json(user)
    })
})



module.exports = router
