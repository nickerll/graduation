<template lang="">
  <div class="conin">
    <el-form ref="loginForm" :model="user" :rules='rules' status-icon label-width="100px">
      <el-row type="flex" justify="center">
        <el-col :span="3">
          <el-form-item label-width="70px">
            <span>
              <font color="pink" size="3">管理员登录</font>
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
        <el-col :span="3">
          <el-form-item>
            <el-button type="primary" icon="el-icon-upload" @click="submit">登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="page-header-image"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: {
          name: 'admin',
          password: '123456'
        },
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
        this.$refs.loginForm.validate((valid) => { //validate表单验证的一个方法
          if (valid) {
            this.$http.post('/users/admin', this.user).then((res) => {
              console.log(res)
              if (res.data) {
                //dispatch采用promise链式调用
                this.$store.dispatch('login', this.admin).then(() => {

                  this.$notify({ //$notify是element-ui中的一个通知弹框方法
                    type: 'success',
                    message: '欢迎你,' + this.user.name + '!',
                    duration: 3000
                  })
                  sessionStorage.setItem("$user", JSON.stringify(this.user))
                  this.$router.replace('/admin/list')
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '用户名或密码错误',
                  showClose: true
                })
              }
            }).catch((err) => {
              this.$message({
                type: 'error',
                message: '网络错误，请重试',
                showClose: true
              })
            })
          } else {
            return false
          }
        })
      }
    }
  }

</script>
<style lang="">
  .page-header-image {
    width: 100%;
    height: 100%;
    background: url(../../assets/login.jpg);
    background-size: cover;
    background-position: center center;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .conin {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    padding-top: 120px;
    box-sizing: border-box;
  }

</style>
