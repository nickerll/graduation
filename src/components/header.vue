<template lang="">
  <div>
    <div class="navtop">
      <div class="navcon">
        <el-col :span="16">
          <el-col class="navleft" :span="4" v-for="(item, index) in word" :key="item.id">
            <router-link :to="item.url">{{ item.word }}</router-link>
          </el-col>
        </el-col>
        <el-col class="navright" :span="8">
          <el-col :span="12">
            <span v-if="JSON.stringify(user) != '{}' ">
              <span class="welcome">欢迎你！{{ user.name }}</span>
              <el-button class="login" type="warning" @click="logout">注销</el-button>
            </span>
            <el-button v-else type="success" @click="login">登录</el-button>
          </el-col>
          <el-col :span="8">
            <div class="serchfic" @click="fica">{{fication}}<i class="el-icon-arrow-down"></i></div>
            <div class="classification" v-if="ficat">
              <span v-for="(item,index) in ficlist" @click="itemlist(item)">{{item}}</span>
            </div>
            <el-input class="search" v-model="searchWord" placeholder="请输入您要搜索的内容"></el-input>
            <i class="el-icon-search" @click="ficsearch"></i>
          </el-col>
        </el-col>
      </div>
    </div>
  </div>
</template>
<script>
  import data from '../../static/index.js';
  export default {
    data() {
      return {
        word: '',
        searchWord: '',
        fication: "请选择",
        ficat: false,
        ficlist: ["景点", "人文", "新闻"]
      };
    },
    mounted() {
      this.word = data.nav.words;
    },
    methods: {
      login() {
        this.$router.replace('/login');
      },
      logout() {
        this.$router.replace('/logout').then(() => {
          this.$router.replace('/login');
          var a = {}
          sessionStorage.$user = JSON.stringify(a)
        });
      },
      fica() {
        this.ficat = !this.ficat
      },
      itemlist(item) {
        this.fication = item
        this.fica()
      },
      ficsearch() {
        this.searchWord
        if (this.fication == "景点") {
          this.$router.push('/messageList?searchWord=' + this.searchWord)
        } else if (this.fication == "人文") {
          this.$router.push('/humanList?searchWord=' + this.searchWord)
        } else if (this.fication == "新闻") {
          this.$router.push('/newsList?searchWord=' + this.searchWord)
        } else {
          if (this.fication == '请选择' && this.searchWord == '') {
            this.$notify({
              type: "info",
              message: "请选择搜索对象并输入搜索内容"
            })
          } else if (this.fication == '请选择') {
            this.$notify({
              type: "info",
              message: "请选择搜索对象"
            })
          } else if (this.searchWord == '') {
            this.$notify({
              type: "info",
              message: "请输入搜索内容"
            })
          }
        }
      }
    },
    updated() {
      console.log();
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    }
  };

</script>
<style lang="">
  .welcome {
    float: left;
    font-size: 14px;
    line-height: 50px;
    margin-right: 10px;
    color: white;
  }

  .login {
    float: left;
  }

  .el-button {
    margin-top: 5px;
  }

  .navtop {
    max-width: 1920px;
    min-width: 1200px;
    margin: 0 auto;
    height: 50px;
    background: #009abf;
  }

  .navcon {
    width: 1200px;
    margin: 0 auto;
  }

  .navleft {
    line-height: 50px;
    font-size: 16px;
    text-align: center;
  }

  .navleft a {
    color: white;
  }

  .navright {
    text-align: center;
  }

  .navright a {
    line-height: 50px;
    font-size: 16px;
    color: white;
  }

  .search {
    width: 230px;
    margin-top: 5px;
    float: left;
  }

  .el-col {
    position: relative;
  }

  .el-input__inner {
    padding-left: 60px;
  }

  .el-icon-search {
    position: absolute;
    right: -86px;
    top: 19px;
    cursor: pointer;
  }

  .serchfic {
    width: 40px;
    height: 20px;
    position: absolute;
    left: 5px;
    top: 17px;
    z-index: 10;
    color: #bebeb2;
    cursor: pointer;
  }

  .el-icon-arrow-down {
    position: absolute;
    z-index: 10;
    left: 40px;
    top: 3px;

  }

  .classification {
    width: 53px;
    height: 60px;
    position: absolute;
    z-index: 10;
    top: 44px;
    left: 6px;
    background: white;
    border-radius: 2px;
    text-align: center;
  }

  .classification span {
    display: block;
    height: 20px;
    line-height: 20px;
  }

  .classification span:hover {
    background: #bebeb2;
    color: #169ff3;
    cursor: pointer;
  }

</style>
