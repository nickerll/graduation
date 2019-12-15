

var express = require('express')
var router = express.Router()

var User = require('../models/user') //存放数据的数据表
var Admin = require('../models/admin') //存放数据的数据表

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

router.route('/validate').post((req,res) => {
    User.findOne({
        name:req.body.name,
        pwd:req.body.password
    },(err,user) => {
        if(err){
            console.log(err)
        }
        res.json(user)
    })
})

router.route('/Register').post((req,res) => {  //注册路由
    User.findOne({      //在数据表中查找
        name:req.body.name, //是否有与输入框相同的账号
    },(err) => {
        if (err) {      //如果错误
            console.log("错误是："+err)    //输出错误
        }
        var user = new User({
            name:req.body.name,
            password:req.body.password,
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