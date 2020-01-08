
//引入中间件
var express = require('express')
var router = express.Router()
var path   = require('path')
var formidable = require('formidable')
var objectId = require('mongodb').ObjectId
var _id = objectId(_id)
// 引入数据库表
var User = require('../models/user') //存放数据的数据表
var Admin = require('../models/admin') //存放数据的数据表
var Scene = require('../models/scene.js') //存放景点的数据表
var Human = require('../models/human.js') //存放人文地理的数据表
var News = require("../models/news.js")   //存放新闻数据的表
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
    console.log('-----所有景点------')
    console.log(data)
    console.log('-----结束--------')
    console.log(req.headers.origin+'/')
    // href:req.headers.origin+'/'+req.body.sceneLogo.replace(/\\/g,'/'),
    res.json({
      href:req.headers.origin+'/',
      scenalldata:data
    })
  })
})
//定义时间
  var d = new Date()
  var year = d.getFullYear()  //年
  var month = d.getMonth()+1  //月
  var day = d.getDate() < 10?'0'+d.getDate():''+d.getDate() //日  三目运算符  判断是否小于十，如果小于十加零否则直接显示
  var hour = d.getHours() //时
  var minutes = d.getMinutes()  //分
  var seconds = d.getSeconds()  //秒
  var now = year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds //日期拼接  年-月-日 时:分:秒
//景点展示-添加景点
router.route('/addScene').post((req,res) => { //定义接口为/addScene以及请求方式为get
  var addscen = new Scene({  //新建一个对象 把表单中的对应的数据赋值到对应的字段中
    title:req.body.title,
    sceneLogo:req.body.sceneLogo,
    describe:req.body.describe,
    createData:now
  })
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
  res.json({
    code:2,
    message:"添加成功!",
    scenecon:addscen
  })
})
//景点展示-删除景点
router.route('/deleScene').get((req,res) => {
  console.log({query:req.query,data:req.params,json:req.body})
  Scene.deleteOne({_id:req.query.id}).then((delsc) => {
    console.log(delsc)
    resData.code = 2
    resData.message = '删除成功'
    res.json(resData)
  })
})
//景点展示-编辑景点
var sceneId
router.route('/editScene').post((req,res) => {
  console.log({query:req.query,data:req.params,json:req.body})
  Scene.findOne({_id:req.body.id}).then((data) => {
    console.log(data)
    res.json({
      code:2,
      message:"",
      data:data
    })
  })
  sceneId = req.body.id
  return sceneId
})
router.route('/chengeScene').post((req,res) => {
  var changeitem = {
    _id:sceneId,
    title:req.body.title,
    sceneLogo:req.body.sceneLogo,
    describe:req.body.describe,
    updateData:now
  }
  Scene.find({_id:sceneId}).then((data) => {
    console.log('///////////////////')
    console.log(data)
    console.log(changeitem)
    if(data){
      Scene.updateOne({_id:sceneId},changeitem).then((chg) => {
        console.log(chg)
        res.json({
          code:2,
          message:'修改成功!'
        })
      })
    }
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
//人文地理
//查询所有的内容
router.route('/humanAll').post((req,res) => {
  Human.find().then((data) => {
    res.json(data)
  })
})
//删除对应的人文地理内容
router.route('/humanDel').post((req,res) => {
  Human.deleteOne({_id:req.query.id}).then((data) => {  //根据id删除对应的内容
    res.json({
      code:2,
      message:"删除成功！",
      data:resData
    })
  })
})
//添加人文地理
router.route('/addhuman').post((req,res) => {
  var human = new Human({
    title:req.body.title,
    humanimg:req.body.humanimg,
    humandesc:req.body.humandesc
  })
  human.save((err,data) => {
    if (err) {
      console.log(err)
    }
    if (data) {
      console.log('----------人文地理--------------')
      console.log('humanadd contain:'+data)
      console.log('-------------------------')
    }
  })
  res.json(human)
})
//新闻发布
//查找所有新闻内容
router.route('/allNews').post((req,res) => {
  News.find().then((data) => {
    res.json(data)
  })
})
//删除对应的新闻内容
router.route('/deleteNews').post((req,res) => {
  News.deleteOne({_id:req.query.id}).then((data) => { //根据id删除
    res.json({
      data:resData,
      code:2,
      message:'删除成功！'
    })
  })
})
//添加新闻内容
router.route('/addNews').post((req,res) => {
  var news = new News({
    newsTitle:req.body.newsTitle,
    releaseDate:req.body.releaseDate,
    releaseCon:req.body.releaseCon,
    newsimg:req.body.newsimg
  })
  news.save((err,data) => {
    if (err) {
      console.log("新闻新增失败,发现错误:"+err)
    }
    if (data) {
      console.log("新闻添加成功:"+data)
      console.log('--------------------------')
    }
  })
  res.json(news)
})

module.exports = router



/**
 * 存在问题:除删除用户之外其他的内容删除的时候不可以根据名称删除,因为用户注册的时候用户名是唯一的,所以可以根据用户名删除用户;而景点,人文等名称是可以有一样的,所以在删除的时候应该根据唯一标识id来删除.  ***已解决***
 * 从后端接口中请求图片路径时要将webpack.dev.conf.js中的contentBase注释掉 前端页面才能根据端口号请求到图片
 * 
 * 存在问题：上传图片后点击删除图片只删除了页面中的图片显示，而上传到文件夹中的图片没有被删除
 * */
