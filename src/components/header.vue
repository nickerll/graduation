<template lang="">
    <div>
        <div class="navtop">
            <div class="navcon">
                <el-col :span="16">
                    <el-col class="navleft" :span="4" v-for="(item,index) in word" :key="item.id" @click="sendlink(item.id,index)">
                        <router-link :to=item.url>{{item.word}}</router-link> 
                    </el-col>
                </el-col>
                <el-col class="navright" :span="8">
                    <el-col :span="12">
                        <span v-if="user">
                            <span class="welcome">欢迎你！{{user.name}}</span>    
                            <el-button class="login" type="warning" @click="logout">注销</el-button>
                        </span>
                        <el-button v-else type='success' @click='login'>登录</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-input class="search" v-model="searchWord" placeholder="请输入您要搜索的内容">
                            <i class="el-icon-search"></i>
                        </el-input>
                    </el-col>
                </el-col>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            word:'',
            searchWord:''
        }
    },
    mounted() {
        this.$http({
            url:"../../static/index.json",
            method:"get"
        }).then((res) => {
            this.word = res.data.nav.words
        })
    },
    methods:{
        sendlink(id,index){
            this.$router.push('/news'+index)
        },
        login(){
            this.$router.replace('/login')
        },
        logout(){
            this.$router.replace('/logout').then(() => {
                this.$router.replace('/login')
            })
        }
    },
    computed: {
        user(){
            return this.$store.state.user
        }
    },
}
</script>
<style lang="">
.welcome{
    float:left;
    font-size:14px;
    line-height:50px;
    margin-right:10px;
    color:white;
}
.login{
    float:left;
}
.el-button{
    margin-top:5px;
}
    .navtop{
       max-width:1920px;
       min-width:1200px;
       margin:0 auto;
        height:50px;
        background:#009abf;
    }
    .navcon{
        width:1200px;
        margin:0 auto;
    }
    .navleft{
        line-height:50px;
        font-size:16px;
        text-align:center;
    }
    .navleft a{
        color:white;
    }
    .navright{
        text-align:center;
    }
    .navright a{
        line-height:50px;
        font-size:16px;
        color:white;
    }
    .search{
        width:200px;
        margin-top:5px;
    }
</style>