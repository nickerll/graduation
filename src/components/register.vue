<template>
    <div>
        <el-form ref='register' :model='user' :rules="rules" status-icon label-width="100px">
            <el-row type="flex" justify="center">
                <el-col :span="2">
                    <el-form-item label-width="70px">
                        <span>
                            <font color="pick" size="3">注册页面</font>
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
                        <el-input v-model="user.password" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label="年龄:" prop="old">
                        <el-input v-model="user.old" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label="性别:" prop="sex">
                        <el-input v-model="user.sex" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label="地址:" prop="address">
                        <el-input v-model="user.address" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="3">
                    <el-form-item>
                       <el-button type="primary" icon="el-icon-upload" @click="register">注册</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user:{},
            rules:{
                name:[{
                    required:true,message:'用户名不能为空',trigger:'blur'
                }],
                password:[{
                    required:true,message:'密码不能为空',trigger:'blur'
                }],
                old:[{
                    required:true,message:'请输入年龄',trigger:'blur'
                }],
                sex:[{
                    required:true,message:'请输入性别',trigger:'blur'
                }],
                address:[{
                    required:true,message:'请输入地址',trigger:'blur'
                }]
            }
        }
    },
    methods: {
        register(){
            this.$refs.register.validate((valid) => {
                if (valid) {
                    this.$http.post('/users/Register',this.user).then((res) => {
                        if(res.data.code == 4){
                            this.$message({
                              type:'error',
                              message:res.data.message,
                              showClose:true
                            })
                        }else{
                            if (res.data) {
                                this.$notify({
                                    type:'success',
                                    message:'注册成功！',
                                    duration:3000
                                })
                                this.$router.replace('/login')
                            }else {
                                this.$message({
                                    type:'error',
                                    message:'注册失败！',
                                    showClose:true
                                })
                            }
                        }
                    }).catch((err) => {
                        this.$message({
                            type:'error',
                            message:'网络错误，请重试',
                            showClose:true
                        })
                    })
                } else {
                    return false
                }
            })
        }
    },
}
</script>
<style lang="">

</style>
