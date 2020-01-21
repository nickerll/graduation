<template>
  <div>
    <headerNav></headerNav>
    <!-- <lunbo></lunbo> -->
    <div class="lunbo">
      <div style="background: #dfdfdf;position: absolute;left: 0;height: 100%;z-index: 10;width: 115px;"></div>
      <!-- <video src="../assets/VID_20200107_213647.mp4" autoplay loop width="100%"></video> -->
      <div style="background: #dfdfdf;position: absolute;right: 0;top:0;height: 100%;z-index: 10;width: 115px;"></div>
    </div>
    <div class="jianjie">
      <div class="jianWord">
        <h1>怀旧古风爱好者</h1>
        <p>“唯我与夫子，信马悠悠行，行到曲江头，反照草树明。”“曲江岸北凭栏干，水面阴生日脚残，尘路行多绿袍故，风亭立久白须寒。”“九天阊阖开宫殿，万国衣冠拜冕旒”</p>
        <p style="margin-top: 5px;">
          四月的曲江池遗址公园内，亭台楼阁，鸟语花香，花间粉蝶，一片春意盎然的景象，矗立在曲江池边的白居易和元稹骑马的雕像，再现了二位诗人在曲江池吟诗作对、骑马悠行的情景。大雁塔下，高中进士的学子们在曲江宴饮后，集体来到大雁塔下，推举善书者将他们的姓名、籍贯和及第的时间用墨笔题在墙壁上，27岁的白居易按捺不住喜悦的心情，写下了“慈恩塔下题名处，十七人中最少年”的千古诗句。夕阳中乐游原上，火红的太阳与盛开樱花遥相辉映，此情此景不禁让人感慨李商隐的诗句“夕阳无限好，只是近黄昏。”
        </p>
      </div>
      <!-- 景点展示 -->
      <div class="scienc">
        <div class="secon">
          <h1>古风美景</h1>
          <div class="scenbeau">
            <div class="scenbecon" v-if="index < 3" v-for="(item, index) in scenelist">
              <div class="scimg" @click="scmessage(item.id)"><img :src="commonUtil.getImgPath(item.sceneLogo)" title="点击查看更多详情" alt="" /></div>
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 景点展示结束 -->
      <!-- 人文地理 -->
      <div style="clear: both;"></div>
      <div class="human">
        <div class="humcon">
          <h1>人文地理</h1>
          <div class="humdiv" v-if="index < 2" v-for="(item, index) in humList">
            <b>{{ item.title }}</b>
            <p>{{ item.humandesc }}</p>
            <span>了解更多</span>
          </div>
        </div>
      </div>
      <!-- 人文地理结束 -->
      <!-- 新闻发布 -->
      <div class="news">
        <div class="newscon">
          <h1>新闻资讯</h1>
          <div class="newscontain"><p></p></div>
        </div>
      </div>
      <!-- 新闻发布结束 -->
      <!--  -->
      <div class="plan"><div class="plancon"></div></div>
      <!--  -->
    </div>
  </div>
</template>
<script>
import headerNav from './header';
import lunbo from './lunbo';
export default {
  components: { headerNav, lunbo },
  data() {
    return {
      msg: '',
      scenelist: [],
      humList: []
    };
  },
  methods: {
    scmessage(id) {
      this.$router.push('/mesdetail?id=' + id);
    }
  },
  mounted() {
    this.$http.get('/users/sceneAll').then(res => {
      console.log(res);
      if (res.status == 200 && res.statusText == 'OK') {
        this.scenelist = res.data.scenalldata;
      } else {
        console.log('error');
      }
    }),
      this.$http.post('/users/humanAll').then(res => {
        console.log(res.data);
        if (res.status == 200 && res.statusText == 'OK') {
          this.humList = res.data;
        } else {
        }
      });
  },
  created() {},
  updated() {}
};
</script>
<style lang="">
.lunbo {
  max-width: 1920px;
  min-width: 1200px;
  height: 500px;
  margin: 0 auto;
  position: relative;
}
.scenbecon {
  width: 30%;
  float: left;
  margin-right: 20px;
}
.scimg {
  width: 100%;
  height: 209.25px;
  overflow: hidden;
}
.scenbecon img {
  width: 100%;
  transition: all 0.5s;
}
.scenbecon img:hover {
  transform: scale(1.2);
}
.scenbecon p {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: white;
  margin-top: 20px;
}
.scenbeau {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}
.plan {
  width: 100%;
  height: 650px;
  background: url(../../static/images/bg4.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
}
.news {
  width: 100%;
  height: 526px;
  background: url(../../static/images/bg3.jpg);
  background-size: cover;
  background-attachment: fixed;
}
.human {
  width: 100%;
  height: 530px;
  background: url(../../static/images/bg2.jpg);
  background-size: cover;
  background-attachment: fixed;
  margin-top: 230px;
}
.humcon,
.newscon {
  width: 1200px;
  margin: 0 auto;
}
.humcon h1 {
  text-align: center;
  font-size: 35px;
  letter-spacing: 2px;
  color: brown;
  position: relative;
  top: 30px;
  margin-bottom: 55px;
}
.humdiv {
  width: 456px;
  height: 370px;
  background: rgba(255, 255, 255, 0.7);
  padding: 50px 30px;
  box-sizing: border-box;
}
.humdiv b {
  font-size: 25px;
  color: brown;
}
.humdiv p {
  width: 100%;
  height: 175px;
  margin-top: 15px;
  font-size: 15px;
  color: #8b8383;
}
.humdiv span {
  display: inline-block;
  width: 86px;
  height: 46px;
  background: #c22337;
  text-align: center;
  line-height: 46px;
  color: white;
  font-size: 15px;
  margin-top: 15px;
}
.scienc {
  width: 100%;
  height: 540px;
  background: url(../../static/images/bg1.jpg);
  background-size: cover;
  position: relative;
  top: 230px;
  background-attachment: fixed;
  overflow: hidden;
}
.secon {
  width: 1200px;
  margin: 30px auto;
}
.secon h1 {
  font-size: 35px;
  font-weight: normal;
  text-align: center;
  color: white;
  letter-spacing: 3px;
  margin-top: 80px;
  margin-bottom: 50px;
}
.scenbeau {
  width: 100%;
}
.jianjie {
  max-width: 1920px;
  min-width: 1200px;
  height: 230px;
  background: #dfdfdf;
  position: relative;
  margin: 0 auto;
}
.jianWord {
  width: 1020px;
  height: 330px;
  background: white;
  position: absolute;
  left: 50%;
  margin-left: -510px;
  top: -100px;
  padding: 0 25px;
  box-sizing: border-box;
}
.jianWord h1 {
  text-align: center;
  font-size: 50px;
  font-family: 'Courier New', Courier, monospace;
  margin: 25px 0;
  font-weight: normal;
  letter-spacing: 2px;
  color: brown;
}
.jianWord p {
  text-indent: 2em;
  font-size: 10px;
  line-height: 35px;
}
.newscon {
  overflow: hidden;
}
.newscon h1 {
  text-align: center;
  color: white;
  font-size: 35px;
  letter-spacing: 3px;
  margin-top: 50px;
}
.newscontain {
  width: 100%;
  margin-top: 50px;
}
</style>
