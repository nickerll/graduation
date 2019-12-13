

var mongoose = require('mongoose')

var adminSchema = new mongoose.Schema({
    name:String,
    pwd:String,
    roles : [
        'clusterAdmin',
        'dbAdminAnyDatabase',
        'userAdminAnyDatabase',
        'readWriteAnyDatabase'
      ]
})

// db.createUser({ //创建管理员用户
//     user : 'admin',
//     pwd : '123456',
//     roles : [
//         'clusterAdmin',
//         'dbAdminAnyDatabase',
//         'userAdminAnyDatabase',
//         'readWriteAnyDatabase'
//     ]
// })

module.exports = mongoose.model("admin",adminSchema)