<template>
  <div>
      <headerNav></headerNav>
      <lunbo></lunbo>
      <div class="jianjie">
          <div class="jianWord">
              <h1></h1>
              <p></p>
              <p></p>
          </div>
          <!-- 景点展示 -->
          <div class="scienc">
            <div class="secon">
              <h1></h1>
            </div>
          </div>
          <!-- 景点展示结束 -->
          <!-- 人文地理 -->
          <div class="human">
            <div class="humcon">

            </div>
          </div>
          <!-- 人文地理结束 -->
          <!-- 新闻发布 -->
          <div class="news">
            <div class="newscon">
            </div>
          </div>
          <!-- 新闻发布结束 -->
          <!--  -->
          <div class="plan">
            <div class="plancon">
            </div>
          </div>
          <!--  -->

      </div>
      
  </div>
</template>
<script>
import headerNav from './header'
import lunbo from './lunbo'
export default {
  components:{headerNav,lunbo},
  methods:{
        
    },
}
</script>
<style lang="">
.plan{
  width:100%;
  height:650px;
  background:url(../../static/images/bg4.jpg) no-repeat;
  background-size:cover;
  background-attachment:fixed;
  background-position: center center;
}
  .news{
    width:100%;
    height:526px;
    background:url(../../static/images/bg3.jpg);
    background-size:cover;
    background-attachment:fixed;
  }
  .human{
    width:100%;
    height:530px;
    background:url(../../static/images/bg2.jpg);
    background-size:cover;
    background-attachment:fixed;
  }
  .scienc{
    width:100%;
    height:730px;
    background:url(../../static/images/bg1.jpg);
    background-size:cover;
    position:relative;
    top:230px;
    background-attachment:fixed;
  }
  .jianjie{
    max-width:1920px;
    min-width:1200px;
    height:230px;
    background:#dfdfdf;
    position:relative;
    margin:0 auto;
  }
  .jianWord{
    width:1020px;
    height:330px;
    background:white;
    position:absolute;
    left:50%;
    margin-left:-510px;
    top:-100px;
  }
</style>