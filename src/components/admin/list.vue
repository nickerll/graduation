<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple">后台管理</div></el-col>
      <el-col :span="6" :offset="12"><div class="grid-content bg-purple">当前用户：</div></el-col>
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
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
  export default{
    data() {
          return {
            tabPosition: 'left',
            tableData: [],
            search: ''
          };
        },
        mounted() {
          var _this = this
          this.$http.post('/users/allusers').then((res) => {
              console.log(res)
              _this.tableData = res.data
          })
        },
        methods:{
          handleEdit(index, row) {
            console.log(index, row);
          },
          handleDelete(index, row) {
            this.$http.get('/users/deleteuser',{
              // data:row._id
              params:{
                data:row._id
              }
            }).then((res) => {
              console.log(res)
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
.el-row {
    margin-right: 0!important;
    margin-left: 0!important;
    line-height: 36px;
    font-size: 14px;
    background: #169ff3;
    color: white;
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
