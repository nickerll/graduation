<template>
  <div class="contin">
    <el-form ref="loginForm" :model="user" :rules='rules' status-icon label-width="100px">
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label-width="70px" style="text-align: center;">
            <span>
              <font color="pink" size="3">注册登录页面</font>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="账户:" prop="name">
            <el-input v-model="user.name" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="user.password" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="submit">登录</el-button>
            <el-button icon="el-icon-upload" @click="register">注册</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="page-header-image"></div>
    <totop></totop>
  </div>
</template>
<script>
  import totop from './hometop.vue'
  export default {
    components:{totop},
    data() {
      return {
        user: {},
        rules: {
          name: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submit: function () {
        this.$http.post('/users/validate', this.user).then((res) => {
          console.log(res)
          if (res.status == 200 && res.statusText == "OK" && res.data.code == 2) {
            this.$notify({ //$notify是element-ui中的一个通知弹框方法
              type: 'success',
              message: '欢迎你,' + this.user.name + '!',
              duration: 3000
            })
            sessionStorage.$user = JSON.stringify(res.data.data[0])
            this.$router.replace('/')
          } else {
            console.log('error')
            this.$message({
              type: 'error',
              message: res.data.message,
              showClose: true
            })
          }
        })
        // this.$refs.loginForm.validate((valid) => { //validate表单验证的一个方法
        //   if (valid) {
        //     this.$http.post('/users/validate', this.user).then((res) => {
        //       console.log(res)
        //       if (res.data) {
        //         //dispatch采用promise链式调用
        //         this.$store.dispatch('login', this.user).then(() => {
        //           this.$notify({ //$notify是element-ui中的一个通知弹框方法
        //             type: 'success',
        //             message: '欢迎你,' + this.user.name + '!',
        //             duration: 3000
        //           })
        //           // sessionStorage.login = JSON.stringify(res.data)
        //           this.$router.replace('/')
        //         })
        //       } else {
        //         this.$message({
        //           type: 'error',
        //           message: '用户名或密码错误',
        //           showClose: true
        //         })
        //       }
        //     }).catch((err) => {
        //       this.$message({
        //         type: 'error',
        //         message: '网络错误，请重试',
        //         showClose: true
        //       })
        //     })
        //   } else {
        //     return false
        //   }
        // })
      },
      register: function () {
        this.$router.replace('/register')
      }
    },
  }

</script>
<style lang="">
  .page-header-image {
    width: 100%;
    height: 100%;
    background: url(../assets/login.jpg);
    background-size: cover;
    background-position: center center;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .contin {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    padding-top: 120px;
    box-sizing: border-box;
  }

</style>
