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
              <el-button size="mini" @click="leavedit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="leavdel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['showbox'],
    data() {
      return {
        leavmsg: []
      }
    },
    methods: {
      closebox() {
        this.$emit('func', false)
      },
      leavedit(index, row) {},
      leavdel(index, row) {},
      screqest(scenid) {
        console.log(scenid)
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
  .closebtn {
    float: right;
    margin-right: 20px;
    font-size: 20px;
  }

  .bgrblack {
    width: 100%;
    height: 100vh;
    position: absolute;
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
