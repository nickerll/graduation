<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple" style="font-size: 16px;padding-left: 50px;">后台审核管理</div>
      </el-col>
      <el-col :span="6" :offset="12">
        <div class="grid-content bg-purple">当前用户：examine(审核员)</div>
      </el-col>
    </el-row>

    <el-tabs :tab-position="tabPosition">
      <!-- 景点展示 -->
      <el-tab-pane label="景点展示审核" style="width: 1041px;">
        <!-- 景点展示列表 -->
        <el-table :data="scenData" border style="width:100%;" v-show="scenTable">
          <el-table-column type="index" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="title" label="景点名称" width="230">
          </el-table-column>
          <el-table-column prop="sceneLogo" label="景点图片" width="230">
            <template slot-scope="scope">
              <img :src="commonUtil.getImgPath(scope.row.sceneLogo)" style="width: 208px;height: 90px;" />
            </template>
          </el-table-column>
          <el-table-column prop='createData' label='创建时间' width='230'>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="scenedel(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="sceneaddson(scope.$index, scope.row)">留言管理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 景点展示列表结束 -->
      </el-tab-pane>
      <!-- 景点展示结束 -->
      <!-- 人文地理 -->
      <el-tab-pane label="人文地理审核">
        <!-- 人文列表 -->
        <el-table v-show="humtab" :data="humanData" border style="width: 100%;">
          <el-table-column type="index" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="title" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="humanimg" label="人文图片" width="180">
            <template slot-scope="scope">
              <img :src="commonUtil.getImgPath(scope.row.humanimg)" style="width: 160px;height: 90px;" />
            </template>
          </el-table-column>
          <el-table-column prop="humandesc" label="人文描述" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="humandel(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="humanaddson(scope.$index, scope.row)">留言管理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 人文列表结束 -->
      </el-tab-pane>
      <!-- 人文地理结束 -->
      <!-- 新闻发布 -->
      <el-tab-pane label="新闻发布审核">
        <!-- 新闻列表 -->
        <el-table v-show="newstab" :data="newsData" border style="width: 100%;">
          <el-table-column type="index" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="newsTitle" label="新闻标题" width="180">
          </el-table-column>
          <el-table-column prop="newsimg" label="新闻图片" width="180">
            <template slot-scope="scope">
              <img :src="commonUtil.getImgPath(scope.row.newsimg)" style="width: 160px;height: 90px;" />
            </template>
          </el-table-column>
          <el-table-column prop="releaseCon" label="新闻内容" width="180">
          </el-table-column>
          <el-table-column prop="releaseDate" label="新闻时间" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="newsdel(scope.$index, scope.row)">删除</el-button>
              <!-- <el-button size="mini" @click="newsaddson(scope.$index, scope.row)">留言管理</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- 新闻列表结束 -->
      </el-tab-pane>
      <!-- 新闻发布结束 -->
    </el-tabs>
    <leavemessage :showbox="showbool" @func="cheshowbool" ref="scenleave"></leavemessage>
    <humanMessage :showhumbox="showhumbool" @func="cheshowhumanbool" ref="humanleave"></humanMessage>
  </div>
</template>
<script>
  import leavemessage from './leavmessalert.vue'
  import humanMessage from './huamleavemessage.vue'
  export default {
    components: {
      leavemessage,
      humanMessage
    },
    data() {
      return {
        showhumbool: false,
        showbool: false,
        tabPosition: 'left',
        tableData: [],
        search: '',
        scene: {},
        human: {},
        news: {},
        scenTable: true,
        humtab: true,
        newstab: true,
        scenData: [],
        humanData: [],
        newsData: [],
        fileList: [{}],
        newsfileList: [{}],
        humanfileList: [{}],
        humid: '',
        newchange: true,
        newsid: ''
      };
    },
    mounted() {
      this.showScene()
      this.humanAll()
      this.newsAll()
    },
    methods: {
      fileimg(file, row) {
        console.log(file)
        this.scene.sceneLogo = file.path
        console.log('success')
      },
      //新闻全部
      newsAll() {
        this.$http.post('/users/allNews').then((res) => {
          console.log(res)
          this.newsData = res.data
        })
      },
      //新闻删除
      newsdel(index, row) {
        this.$confirm('是否删除该条信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/users/deleteNews?id=' + row._id).then((res) => {
            console.log(res)
            if (res.status == 200 && res.statusText == "OK") {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.newsAll()
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      //新闻留言管理
      newsaddson() {},
      humanAll() {
        this.$http.post('/users/humanAll').then((res) => {
          console.log(res)
          this.humanData = res.data
        })
      },
      //人文删除
      humandel(index, row) {
        this.$confirm('是否删除该条信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/users/humanDel?id=' + row._id).then((res) => {
            console.log(res)
            if (res.status == 200 && res.statusText == "OK") {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.humanAll()
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      cheshowhumanbool(data) {
        this.showhumbool = data
      },
      //人文留言管理
      humanaddson(index, row) {
        this.showhumbool = true
        console.log(row)
        this.$refs.humanleave.screqest(row._id)
      },
      //留言管理点击关闭  接收子组件传值false
      cheshowbool(data) {
        this.showbool = data
      },
      //景点留言管理
      sceneaddson(index, row) {
        this.showbool = true
        console.log(row._id)
        console.log('景点留言管理')
        this.$refs.scenleave.screqest(row._id)
      },
      //景点删除
      scenedel(index, row) {
        this.$http.get('/users/deleScene').then((res) => {
          this.$confirm('是否删除该条信息?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.get('/users/deleScene', {
              params: {
                id: row._id
              }
            }).then((res) => {
              if (res.data.code == 2) {
                this.$message({
                  type: 'success',
                  message: res.data.message
                })
                this.showScene()
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        })
      },
      //查询所有景点
      showScene() {
        var _this = this
        this.$http.get('/users/sceneAll').then((res) => {
          console.log(res)
          _this.scenData = res.data.scenalldata
        })
      }
    },
    created() {

    },
    updated() {

    }
  }

</script>

<style>
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
  }

  .el-button+.el-input {
    opacity: 0;
    width: 98px;
    height: 40px;
    position: absolute;
    left: 0;
    z-index: 50;
  }

  .scenbtn {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-input {
    width: 400px;
  }

  .el-textarea__inner {
    height: 200px;
    width: 400px;
  }

  .el-form>.el-row {
    background: none;
    height: auto;
  }

  .el-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
    line-height: 50px;
    font-size: 14px;
    background: #169ff3;
    color: white;
    height: 50px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    /* background: #d3dce6; */
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-form-item__content {
    width: 400px;
  }

</style>
