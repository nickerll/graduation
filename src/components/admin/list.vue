<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple" style="font-size: 16px;padding-left: 50px;">后台管理</div></el-col>
      <el-col :span="6" :offset="12"><div class="grid-content bg-purple">当前用户：admin(管理员)</div></el-col>
    </el-row>

    <el-tabs :tab-position="tabPosition">
        <!-- 用户管理 -->
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
        <!-- 用户管理结束 -->
        <!-- 景点展示 -->
        <el-tab-pane label="景点展示维护" style="width: 1041px;">
          <!-- 景点展示列表 -->
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
            prop="sceneLogo"
            label="景点图片"
            width="230">
              <template slot-scope="scope">
                <img :src="commonUtil.getImgPath(scope.row.sceneLogo)" style="width: 208px;height: 90px;"/>
              </template>
            </el-table-column>
            <el-table-column
            prop='createData'
            label='创建时间'
            width='230'>
            </el-table-column>
            <el-table-column
            label="操作"
            width="250">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="scenedit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="scenedel(scope.$index, scope.row)">删除</el-button>
                <el-button
                size="mini"
                @click="sceneaddson(scope.$index, scope.row)">增加子类</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 景点展示列表结束 -->
          <!-- 添加景点 -->
          <el-form enctype="multipart/form-data" v-show='scbtn' ref="sceneForm" :model="scene" :rules='rules' status-icon label-width="100px">
              <el-row type="flex" justify="left">
                  <el-col :span="5">
                      <el-form-item label="景点名称:" prop="title">
                          <el-input v-model="scene.title" size="small"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row type="flex" justify="left" style="height: auto;">
                  <el-col :span="10">
                      <el-form-item label="景点图片:"> <!-- prop="sceneLogo" -->
                        <!-- <el-button type="primary">点击上传</el-button>
                        <el-input type="file" id="file" @click="file" ref="inputer" v-model="scene.sceneLogo"></el-input>
                        <div class="block" v-for="(item,index) in fileList">
                          <el-image :src="getObjectURL(item)"></el-image>
                        </div> -->
                        <!-- 上传结合nodejs中的multer
                        :auto-upload=false  // 取消自动上传
                        :on-remove="handleRemove" // 处理删除图片的操作
                        :on-change="onchange" // 通过onchange这个属性来获取现在的图片和所有准备上传的图片
                        :limit=1 // 限制只能上传一张，这里暂时只考虑一张图片的情况
                        drag // 设置这个让可以把图片拖进来上传
                        action="" // 这里暂时不设置上传地址，因为我们是要拦截在form中上传
                        -->
                        <el-upload
                          class="upload-demo"
                          action="http://localhost:3000/uploadfile"
                          :limit = '1'
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :on-success="fileimg"
                          list-type="picture"
                          ref="uploadscenimg"
                          v-model="scene.sceneLogo">
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb(上传一张即可)</div>
                        </el-upload>
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
                  <el-col :span="7">
                      <el-form-item>
                         <el-button type="primary" icon="el-icon-upload" @click="sceneSubmit">提交</el-button>
                         <el-button type="info" icon="el-icon-close" plain @click="CloseScen">关闭</el-button>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
          <!-- 添加景点结束 -->
        </el-tab-pane>
        <!-- 景点展示结束 -->
        <!-- 人文地理 -->
        <el-tab-pane label="人文地理维护">
          <!-- 人文列表 -->
            <el-button class="scenbtn" type="primary" @click="humaddbtn" v-show="humbtn" icon="el-icon-plus" size="mini">新增</el-button>
            <el-table
            v-show="humtab"
            :data="humanData"
            border
            style="width: 100%;">
              <el-table-column
              type="index"
              label="序号"
              width="100">
              </el-table-column>
              <el-table-column
              prop="title"
              label="名称"
              width="180">
              </el-table-column>
              <el-table-column
              prop="humanimg"
              label="人文图片"
              width="180">
              <el-image :src="human.humanimg">
              </el-image>
              </el-table-column>
              <el-table-column
              prop="humandesc"
              label="人文描述"
              width="180"></el-table-column>
              <el-table-column
              label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="humanedit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="humandel(scope.$index, scope.row)">删除</el-button>
                    <el-button
                    size="mini"
                    @click="humanaddson(scope.$index, scope.row)">增加子类</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <!-- 人文列表结束 -->
            <!-- 添加人文 -->
            <el-form enctype="multipart/form-data" ref="humanForm" :model="human" :rules='rules' status-icon label-width="100px" v-show="humform">
              <el-row type="flex" justify="left">
                <el-col :span="5">
                  <el-form-item label="名称(标题)" prop="title">
                    <el-input v-model="human.title" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="left">
                <el-col :span="5">
                  <el-form-item label="人文图片" prop="humanimg">
                    <el-image :src="human.humanimg"></el-image>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="left">
                <el-col :span="5">
                  <el-form-item label="人文描述" prop="humandesc">
                    <el-input type="textarea"
                    v-model="human.humandesc"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="left">
                <el-col :span="5">
                  <el-button type="primary" icon="el-icon-upload">提交</el-button>
                  <el-button type="info" icon="el-icon-close" @click="humclose">关闭</el-button>
                </el-col>
              </el-row>
            </el-form>
            <!-- 添加人文结束 -->
        </el-tab-pane>
        <!-- 人文地理结束 -->
        <!-- 新闻发布 -->
        <el-tab-pane label="新闻发布维护">
          <!-- 新闻列表 -->
          <el-button class="scenbtn" type="primary" @click="newsaddbtn" v-show="newsbtn" icon="el-icon-plus" size="mini">新增</el-button>
          <el-table
          v-show="newstab"
          :data="newsData"
          border
          style="width: 100%;">
            <el-table-column
            type="index"
            label="序号"
            width="100">
            </el-table-column>
            <el-table-column
            prop="newsTitle"
            label="新闻标题"
            width="180">
            </el-table-column>
            <el-table-column
            prop="newsimg"
            label="新闻图片"
            width="180">
            <el-image :src="news.newsimg">
            </el-image>
            </el-table-column>
            <el-table-column
            prop="releaseCon"
            label="新闻内容"
            width="180">
            </el-table-column>
            <el-table-column
            prop="releaseDate"
            label="新闻时间"
            width="180">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="humanedit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="humandel(scope.$index, scope.row)">删除</el-button>
                  <el-button
                  size="mini"
                  @click="humanaddson(scope.$index, scope.row)">增加子类</el-button>
                </template>
            </el-table-column>
          </el-table>
          <!-- 新闻列表结束 -->
          <!-- 新增新闻列表 -->
          <el-form enctype="multipart/form-data" ref="newsForm" :model="news" :rules='rules' status-icon label-width="100px" v-show="newsform">
            <el-row type="flex" justify="left">
              <el-col :span="5">
                <el-form-item label="新闻标题" prop="newsTitle">
                  <el-input v-model="news.newsTitle" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="5">
                <el-form-item label="新闻图片" prop="newsimg">
                  <el-image :src="news.newsimg"></el-image>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="5">
                <el-form-item label="新闻内容" prop="releaseCon">
                  <el-input type="textarea"
                  v-model="news.releaseCon"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="5">
                <el-form-item label="新闻时间" prop="releaseDate">
                  <el-input v-model="news.releaseDate"
                  size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="left">
              <el-col :span="5">
                <el-button type="primary" icon="el-icon-upload">提交</el-button>
                <el-button type="info" icon="el-icon-close" @click="newscolse">关闭</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- 新增新闻列表结束 -->
        </el-tab-pane>
        <!-- 新闻发布结束 -->
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
            human:{},
            news:{},
            rules:{
              title:[{required:true,message:'景点名称不能为空',trigger:'blur'}],
              sceneLogo:[{required:true,message:'景点图片不能为空',trigger:'blur'}],
              describe:[{required:true,message:'景点描述不能为空',trigger:'blur'}],
              humanimg:[{required:true,message:'人文图片不能为空',trigger:'blur'}],
              humandesc:[{required:true,message:'人文描述不能为空',trigger:'blur'}],
              newsTitle:[{required:true,message:'新闻标题不能为空',trigger:'blur'}],
              releaseDate:[{required:true,message:'新闻时间不能为空',trigger:'blur'}],
              releaseCon:[{required:true,message:'新闻内容不能为空',trigger:'blur'}],
              newsimg:[{required:true,message:'新闻图片不能为空',trigger:'blur'}]
            },
            scbtn:false,
            scenTable:true,
            humtab:true,
            humform:false,
            humbtn:true,
            newstab:true,
            newsform:false,
            newsbtn:true,
            scenData:[],
            humanData:[],
            newsData:[],
            scenimgpath:""
          };
        },
        mounted() {
          this.showUser()
          this.showScene()
        },
        methods:{
          fileimg(file,row){
            console.log(file)
            this.scene.sceneLogo = file.path
            console.log('success')
          },
          // 新闻新增按钮
          newsaddbtn(){
            if (this.newsbtn == true) {
              this.newstab = false
              this.newsform = true
              this.newsbtn = false
            } else{
              this.newstab = true
              this.newsform = false
              this.newsbtn = true
            }
          },
          // 新闻关闭按钮
          newscolse(){
            this.newstab = true
            this.newsform = false
            this.newsbtn = true
          },
          //人文新增按钮
          humaddbtn(){
            if (this.humbtn == true) {
              this.humtab = false
              this.humform = true
              this.humbtn = false
            } else{
              this.humtab = true
              this.humform = false
              this.humbtn = true
            }
          },
          //人文关闭按钮
          humclose(){
            this.humtab = true
            this.humform = false
          },
          //人文编辑
          humanedit(){},
          //人文删除
          humandel(){},
          //人文增加子类
          humanaddson(){},
          //景点添加子类
          sceneaddson(){
              console.log('景点添加子类')
          },
          //景点编辑
          scenedit(index,row){
            console.log("景点编辑")
            console.log(row._id)
          },
          //景点删除
          scenedel(index,row){
              this.$http.get('/users/deleScene').then((res) => {
                  this.$confirm('是否删除该条信息?','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                  }).then(() => {
                    this.$http.get('/users/deleScene',{
                      params:{
                        id:row._id
                      }
                    }).then((res) => {
                      if (res.data.code == 2) {
                        this.$message({
                          type:'success',
                          message:res.data.message
                        })
                        this.showScene()
                      }
                    })
                  }).catch(() => {
                    this.$message({
                      type:'info',
                      message:'已取消删除'
                    })
                  })
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
              _this.scenData = res.data.scenalldata
              // var href = res.data.href
              // console.log(_this.scenData[0].sceneLogo)
              // console.log(this.commonUtil.getImgPath(res.data.scenalldata[0].sceneLogo))
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
            var _this = this
            this.$refs.sceneForm.validate((valid) => {
              if (valid) {
                   this.$http.post('/users/addScene',this.scene).then((res) => {
                     console.log(res.data)
                     this.$notify({
                       title:'提示',
                       message:'添加成功',
                       type:'success'
                     })
                     this.$refs['uploadscenimg'].clearFiles()
                     this.scene.title = ''
                     this.scene.describe = ''
                     this.scene.sceneLogo = ''
                     this.scenTable = true
                     this.scbtn = false
                     this.showScene()
                   })
              } else{

              }
            })
          },
          // 景点处理图片删除的操作
          handleRemove(file, fileList) {
            console.log(file, fileList);
            this.$http.get('/removeUploadfileimg').then( (res) => {
              console.log(res)
            })
          },
          handlePreview(file) {
            console.log(file);
          },
          //景点新增按钮
          addscen(){
            if (this.scbtn == true) {
              this.scbtn = false
              this.scenTable = true
            } else{
              this.scbtn = true
              this.scenTable = false
            }
          },
          //景点关闭按钮
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
  .el-button+.el-input{
    opacity: 0;
    width: 98px;
    height: 40px;
    position: absolute;
    left: 0;
    z-index: 50;
  }
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
