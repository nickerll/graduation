<template>
  <div>
    <div class="bgrblack" v-if="showbox">
      <div class="alertcon">
        <span class="closebtn" @click="closebox"><i class="el-icon-close"></i></span>
        <el-table :data="leavmsg" align="center" style="width: 100%" max-height="500">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="用户名" width="180"></el-table-column>
          <el-table-column prop="content" label="留言内容" width="180"></el-table-column>
          <el-table-column prop="creatime" label="留言时间" width="180"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="leavdel(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="leavreply(scope.$index, scope.row)">回复</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bgrblack" v-if="repclo">
        <div class="repcon">
          <i class="el-icon-close" @click="repcolse"></i>
          <textarea name="" id="reptext" cols="30" rows="10" v-model="replytext"></textarea>
          <span class="repbtn" @click="replybtn">回复</span>
          <div class="reptextcon">
            <div class="reptexhicon">
                <div class="noreplay" v-if="Searchrep == ''">暂无回复......</div>
                <div class="hasreplay" v-else>
                  <p>{{Searchrep.content}}</p>
                  <span>{{Searchrep.createDate}}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['showbox'],
    data() {
      return {
        leavmsg: [],
        leavedelid: '',
        repclo:false,
        replytext:'',
        repid:'',
        Searchrep:''
      }
    },
    methods: {
      replybtn(){
        this.$http.post('/users/scenereply',{
          repid:this.repid,
          repword:this.replytext
        }).then((res) => {
          console.log(res)
          if (res.status == 200 && res.statusText == "OK") {
            this.$message({
              type:"success",
              message:res.data.message
            })
            this.replytext = ''
            this.SearchRep()
          } else {
            console.log('error')
          }
        })
      },
      //查询该评论下的所有回复
      SearchRep(){
        console.log(this.leavedelid)
        console.log(this.repid)
        this.$http.post('/users/Searchreply',{
          repleavid:this.leavedelid,
          repid:this.repid,
        }).then((res) => {
          console.log(res)
          if (res.status == 200 && res.statusText == "OK") {
            if (res.data.data[0].leavemessage[0].replymessage == undefined) {
              this.Searchrep = ''
            } else {
             this.Searchrep = res.data.data[0].leavemessage[0].replymessage[0] 
            }
          } else {
            console.log('error')
          }
        })
      },
      repcolse(){
        this.repclo = false
      },
      leavreply(index,row){
        console.log(row)
        this.repid = row.id
        this.repclo = true
        this.SearchRep()
      },
      closebox() {
        this.$emit('func', false)
      },
      //留言编辑
      leavedit(index, row) {},
      //留言删除
      leavdel(index, row) {
        this.$confirm("是否删除这条留言？", "提示", {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$http.post('/users/scenleavemessagedelete', this.qs.stringify({
            id: this.leavedelid,
            content: row.content
          })).then((res) => {
            console.log(res)
            if (res.status == 200 && res.statusText == "OK") {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.screqest(this.leavedelid)
            } else {
              console.log("error")
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
      },
      //当前景点下的所有留言内容
      screqest(scenid) {
        console.log(scenid)
        this.leavedelid = scenid
        this.$http.get('/users/findSceneById', {
          params: {
            id: scenid
          }
        }).then((res) => {
          console.log(res)
          if (res.status == 200 && res.statusText == "OK") {
            var data = res.data.data[0]
            this.leavmsg = data.leavemessage
          } else {
            console.log('error')
          }
        })
      }
    },
    mounted() {

    },
    created() {
      
    },
    updated() {

    },
    destroyed() {

    },
  }

</script>
<style lang="" scoped>
  .hasreplay p{
    font-size: 15px;
  }
  .hasreplay span{
    float: right;
  }
  .noreplay{
    text-align: center;
  }
  .reptexhicon{
    width: 100%;
    height: auto;
    overflow: auto;
  }
  .reptextcon{
    width: 800px;
    height: 170px;
    margin-top: 50px;
    margin-left: 40px;
    overflow: hidden;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .repbtn{
    display: block;
    position: absolute;
    right: 70px;
    margin-top: 8px;
    background: #169ff3;
    color: white;
    width: 50px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border-radius: 5px;
  }
  .repbtn:hover{
    background: #0898f1;
    color: #16d9f3;
    cursor: pointer;
  }
  #reptext{
    width: 800px;
    margin-top: 70px;
    margin-left: 40px;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .repcon .el-icon-close{
    display: block;
    float: right;
    margin-right: 15px;
    font-size: 15px;
    cursor: pointer;
  }
  .repcon{
    width: 900px;
    height: 500px;
    background: white;
    border-radius: 10px;
    position: fixed;
    top: 10px;
    right: 0;
    left: 0;
    bottom: 10px;
    margin: auto;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .closebtn {
    float: right;
    margin-right: 20px;
    font-size: 20px;
  }

  .bgrblack {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.3)
  }

  .alertcon {
    width: 1000px;
    height: auto;
    background: white;
    border-radius: 10px;
    position: fixed;
    top: 10px;
    right: 0;
    left: 0;
    bottom: 10px;
    margin: auto;
    padding-top: 10px;
    box-sizing: border-box;
  }

</style>
