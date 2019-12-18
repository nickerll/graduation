<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple" style="font-size: 16px;padding-left: 50px;">后台管理</div></el-col>
      <el-col :span="6" :offset="12"><div class="grid-content bg-purple">当前用户：admin(管理员)</div></el-col>
    </el-row>

    <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="用户管理">

          <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
                <!-- <el-table-column
                type="selection"
                  width="50">
                </el-table-column> -->
                <el-table-column
                 type="index"
                 label="序号"
                 width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="用户名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="pwd"
                  label="密码"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="old"
                  label="年龄"
                  width="180">
                </el-table-column><el-table-column
                  prop="sex"
                  label="性别"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
                <el-table-column
                label="操作"
                width="180">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right">
                  <template slot="header" slot-scope="scope">
                    <el-input
                      v-model="search"
                      size="mini"
                      placeholder="输入关键字搜索"/>
                  </template>
                </el-table-column>
              </el-table>
        </el-tab-pane>
        <el-tab-pane label="景点展示维护">
          <el-button @click="addscen" v-show="scenTable" class="scenbtn" type="primary" size="mini" icon="el-icon-plus">新增</el-button>
          <el-table
          :data="scenData"
          border
          style="width:100%;"
          v-show="scenTable">
          <el-table-column
          type="index"
          label="序号"
          width="100">
          </el-table-column>
            <el-table-column
            prop="title"
            label="景点名称"
            width="230">
            </el-table-column>
            <el-table-column
            prop="title"
            label="景点图片"
            width="230">
            </el-table-column>
            <el-table-column
            prop='createData'
            label='创建时间'
            width='230'>
            </el-table-column>
            <el-table-column
            label="操作"
            width="230">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="scenedit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="scenedel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form v-show='scbtn' ref="sceneForm" :model="scene" :rules='rules' status-icon label-width="100px">
              <el-row type="flex" justify="left">
                  <el-col :span="5">
                      <el-form-item label="景点名称:" prop="title">
                          <el-input v-model="scene.title" size="small"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row type="flex" justify="left" style="height: auto;">
                  <el-col :span="5">
                      <el-form-item label="景点图片:" prop="sceneLogo">
                        <el-button type="primary" @click="upload">点击上传</el-button>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row type="flex" justify="left" style="height: auto;">
                  <el-col :span="5" style="width: 500px;">
                      <el-form-item label="景点描述:" prop="describe">
                          <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="scene.describe"
                            show-word-limit
                          ></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row type="flex" justify="left">
                  <el-col :span="6">
                      <el-form-item>
                         <el-button type="primary" icon="el-icon-upload" @click="sceneSubmit">提交</el-button>
                         <el-button type="info" icon="el-icon-close" plain @click="CloseScen">关闭</el-button>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="人文地理维护">人文地理维护</el-tab-pane>
        <el-tab-pane label="新闻发布维护">新闻发布维护</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
  export default{
    data() {
          return {
            tabPosition: 'left',
            tableData: [],
            search: '',
            scene:{},
            rules:{
              title:[{required:true,message:'景点名称不能为空',trigger:'blur'}],
              sceneLogo:[{required:true,message:'景点图片不能为空',trigger:'blur'}],
              describe:[{required:true,message:'景点描述不能为空',trigger:'blur'}]
            },
            scbtn:false,
            scenTable:true,
            scenData:[],
            fileList:""
          };
        },
        mounted() {
          this.showUser()
          this.showScene()
        },
        methods:{
          upload(){
            a
          },
          scenedit(){

          },
          scenedel(){
              this.$http.get('/users/deleScene').then((res) => {
                
              })
          },
          //调取接口查询所有用户
          showUser(){
            var _this = this
            this.$http.post('/users/allusers').then((res) => {
                console.log(res)
                _this.tableData = res.data
            })
          },
          //查询所有景点
          showScene(){
            var _this = this
            this.$http.get('/users/sceneAll').then((res) => {
              console.log(res)
              _this.scenData = res.data
            })
          },
          //编辑按钮
          handleEdit(index, row) {
            console.log(index, row);
          },
          //删除按钮
          handleDelete(index, row) {
            var _this = this  //将全局的this指向赋值给_this
            this.$confirm('是否删除该用户?','提示',{ //elementui中confirm弹窗
              confirmButtonText:'确定',//confirm弹窗中按钮1文字内容
              cancelButtonText:'取消',//confirm弹窗中按钮2文字内容
              type:'warning'  //弹框状态为警告
            }).then(() => { //点击确定之后请求删除用户接口
              this.$http.get('/users/deleteuser',{
                // data:row._id //post请求直接带参数
                params:{ //get请求参数写到params中
                  data:row.name //传的参数为name
                }
              }).then((res) => {  //接口请求成功之后
                if (res.data.code == 2) { //如果接口中返回的数据code为2时
                  this.$message({ //弹框提示
                    type:'success', //状态‘成功’
                    message:res.data.message //提示消息为接口数据message
                  })
                  //axios中要实现局部刷新页面数据，要监听data中数据，所以要重新请求一次查询所有用户的方法
                  _this.showUser() //重新请求数据从而局部刷新页面
                }
              })
            }).catch(() => { //点击取消按钮
              this.$message({ //弹窗提示
                type:'info',  //弹窗为消息弹窗
                message:'已取消删除' //弹窗文字为‘已取消删除’
              })
            })
          },
          //景点展示提交
          sceneSubmit(){
            this.$refs.sceneForm.validate((valid) => {
              if (valid) {
                   this.$http.post('/users/addScene',this.scene).then((res) => {
                     this.$notify({
                       title:'提示',
                       message:'添加成功',
                       type:'success'
                     })
                   })
              } else{

              }
            })
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log(file);
          },
          addscen(){
            if (this.scbtn == true) {
              this.scbtn = false
              this.scenTable = true
            } else{
              this.scbtn = true
              this.scenTable = false
            }
          },
          CloseScen(){
            this.scenTable = true
            this.scbtn = false
          }
        },
        created() {

        },
        updated() {

        }
  }
</script>

<style>
  .scenbtn{
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
  .el-input{
    width: 400px;
  }
  .el-textarea__inner{
    height: 400px;
  }
  .el-form>.el-row{
    background: none;
    height: auto;
  }
.el-row {
    margin-right: 0!important;
    margin-left: 0!important;
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
</style>
