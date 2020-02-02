<template>
  <div>
    <div class="contain">
      <h1 class="sctitle">{{msg.title}}</h1>
      <div class="mesdimg">
        <img :src="commonUtil.getImgPath(msg.sceneLogo)" alt="">
      </div>
      <div class="scword">{{msg.describe}}</div>
      <div class="mesliuyan">
        <form action="">
          <textarea name="" id="liutext" cols="30" v-model="sceneliu" rows="10" placeholder="说点什么吧......"></textarea>
          <input class="subtn" @click="subtn" type="button" value="留言">
        </form>
        <div class="liuhistory">
          <div class="liuhnothing" v-if="Length <= 0"><span>暂无用户留言.....</span></div>
          <div class="liuhusthing" v-else>
            <div class="husthning" v-for="(item,index) in msg.leavemessage">
              <h1>{{item.name}}</h1>
              <p>{{item.content}}</p>
              <span>{{item.creatime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <totop></totop>
  </div>
</template>

<script>
  import totop from './hometop.vue'
  export default {
    components:{totop},
    data() {
      return {
        msg: '',
        sceneliu: '',
        nowtime: '',
        Length:''
      }
    },
    methods: {
      subtn() { //点击留言按钮，如果用户未登录，提示用户登录；如果用户处于登录状态，点击留言按钮获取输入框中的留言，将数据存储到景点数据表中的留言字段中。
        if (sessionStorage.$user != "{}" && sessionStorage.$user != undefined) { //如果用户处于登录状态
          this.$http.post('/users/leavemessageById', this.qs.stringify({
            id: this.$route.query.id,
            leavemessage: this.sceneliu,
            name: JSON.parse(sessionStorage.$user).name,
            creatime: this.nowtime
          })).then((res) => {
            console.log(res)
            if (res.status == 200 && res.statusText == "OK") {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.sceneliu = ''
              this.showAllleaveMessage()
            } else {
              console.log('error')
            }
          })
        } else { //用户处于未登录状态
          this.$confirm('登录后可进行留言，是否登录？', '提示', {
            confirmButtonText: '去登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/login')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消登录！'
            })
          })
        }
      },
      showAllleaveMessage() {
        this.$http.get('/users/findSceneById', {
          params: {
            id: this.$route.query.id
          }
        }).then((res) => {
          console.log(res)
          if (res.status == 200 && res.statusText == "OK") {
            var data = res.data.data[0]
            this.msg = data
            this.Length = this.msg.leavemessage.length
          } else {
            console.log('error')
          }
        })
      }
    },
    created() {
      //定义时间
      var d = new Date()
      var year = d.getFullYear() //年
      var month = d.getMonth() + 1 //月
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate() //日  三目运算符  判断是否小于十，如果小于十加零否则直接显示
      var hour = d.getHours() //时
      var minutes = d.getMinutes() //分
      var seconds = d.getSeconds() //秒
      var now = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds //日期拼接  年-月-日 时:分:秒
      this.nowtime = now
      //根据id查询数据
      this.showAllleaveMessage()
      
    },
    mounted() {
      
    },
    updated() {

    },
    destroyed() {

    }
  }

</script>
<style scoped>
  .husthning h1 {
    font-size: 14px;
    margin-bottom: 7px;
  }

  .husthning p {
    text-indent: 2em;
    margin-bottom: 10px;
  }

  .husthning span {
    display: block;
    width: 100%;
    text-align: right;
  }

  .husthning {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #b4a5a5;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .liuhusthing {
    width: 100%;
  }

  .liuhnothing {
    width: 100%;
    text-align: center;
    color: #837474;
  }

  .liuhnothing span {}

  .liuhistory {
    width: 100%;
    margin-top: 50px;
  }

  .subtn {
    display: block;
    width: 70px;
    height: 30px;
    background: #136396;
    color: white;
    float: right;
    border-radius: 10px;
    margin-top: 10px;
  }

  .subtn:hover {
    background: #169ff3;
    cursor: pointer;
  }

  .subtn::after {
    content: '';
    display: block;
    clear: both;
  }

  #liutext {
    width: 100%;
    resize: none;
    padding: 10px 15px;
    box-sizing: border-box;
  }

  .mesliuyan {
    width: 100%;
    margin-top: 20px;
  }

  .contain {
    width: 640px;
    margin: 80px auto 20px;
  }

  .sctitle {
    text-align: center;
    font-size: 25px;
    margin-bottom: 20px;
  }

  .mesdimg {
    width: 100%;
    height: 400px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .mesdimg img {
    width: 100%;
  }

  .scword {
    text-indent: 2em;
  }

</style>
