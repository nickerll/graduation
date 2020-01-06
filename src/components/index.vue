<template>
  <div>
      <headerNav></headerNav>
      <lunbo></lunbo>
      <div class="jianjie">
          <div class="jianWord">
              <h1>怀旧古风爱好者</h1>
              <p>“唯我与夫子，信马悠悠行，行到曲江头，反照草树明。”“曲江岸北凭栏干，水面阴生日脚残，尘路行多绿袍故，风亭立久白须寒。”“九天阊阖开宫殿，万国衣冠拜冕旒”</p>
              <p style="margin-top: 5px;">四月的曲江池遗址公园内，亭台楼阁，鸟语花香，花间粉蝶，一片春意盎然的景象，矗立在曲江池边的白居易和元稹骑马的雕像，再现了二位诗人在曲江池吟诗作对、骑马悠行的情景。大雁塔下，高中进士的学子们在曲江宴饮后，集体来到大雁塔下，推举善书者将他们的姓名、籍贯和及第的时间用墨笔题在墙壁上，27岁的白居易按捺不住喜悦的心情，写下了“慈恩塔下题名处，十七人中最少年”的千古诗句。夕阳中乐游原上，火红的太阳与盛开樱花遥相辉映，此情此景不禁让人感慨李商隐的诗句“夕阳无限好，只是近黄昏。”</p>
          </div>
          <!-- 景点展示 -->
          <div class="scienc">
            <div class="secon">
              <h1>古风美景</h1>
              <div class="scenbeau">

              </div>
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
    overflow: hidden;
  }
  .secon{
    width: 1200px;
    margin: 30px auto;
  }
  .secon h1{
    font-size: 35px;
    font-weight: normal;
    text-align: center;
    color: white;
    letter-spacing: 3px;
    margin-top: 80px;
    margin-bottom: 50px;
  }
  .scenbeau{
    width: 100%;
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
    padding: 0 25px;
    box-sizing: border-box;
  }
  .jianWord h1{
    text-align: center;
    font-size: 50px;
    font-family: 'Courier New', Courier, monospace;
    margin: 25px 0;
    font-weight: normal;
    letter-spacing: 2px;
    color: brown;
  }
  .jianWord p{
    text-indent: 2em;
    font-size: 10px;
    line-height: 35px;
  }
</style>