<template>
  <div>
    <div class="contain">
      <h1 class="sctitle">{{msg.newsTitle}} <span class="scspan">{{msg.releaseDate}}</span></h1>
      <div class="mesdimg">
        <img :src="commonUtil.getImgPath(msg.newsimg)" alt="">
      </div>
      <p class="scword">{{msg.releaseCon}}</p>
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
        msg: ''
      }
    },
    created() {
      this.$http.post('/users/findnewById', {
        id: this.$route.query.id
      }).then((res) => {
        console.log(res)
        if (res.status == 200 && res.statusText == "OK") {
          var data = res.data.data[0]
          this.msg = data
        } else {
          console.log('error')
        }
      })
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
  .contain {
    width: 640px;
    margin: 80px auto 20px;
  }

  .scspan {
    font-size: 14px;
    font-weight: normal;
    display: block;
    width: 150px;
    margin-left: 445px;
    margin-top: 20px;
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
