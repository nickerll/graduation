<template>
  <div class="page-header-image">
    <div class="contain">
      <div class="sclist" @click="gomessagedetail(item._id)" v-for="(item,index) in msg">
        <div class="sclistimg">
          <img :src="commonUtil.getImgPath(item.humanimg)" alt="" :title="item.title">
        </div>
        <p class="sclistword">{{item.humandesc}}</p>
      </div>
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
    methods: {
      gomessagedetail(id) {
        this.$router.push('/humandetail?id=' + id)
      }
    },
    created() {
      this.$http.post('/users/humanAll',{
        word:this.$route.query.searchWord
      }).then((res) => {
        console.log(res)
        if (res.status == 200 && res.statusText == "OK") {
          var data = res.data
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
  .page-header-image {
    width: 100%;
    background: url(../assets/login.jpg);
    background-size: cover;
    background-position: center center;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }
  .backhome{
    right: 20px;
  }

  body {
    background: #f1f1f1;
  }
  .sclistimg img {
    width: 100%;
    height: 100%;
  }

  .contain {
    width: 1200px;
    height: auto;
    margin: 80px auto 0;
  }

  .sclist {
    width: 500px;
    height: 390px;
    float: left;
    border: 1px solid #969393;
    cursor: pointer;
    transition: all 0.5s;
    margin-right: 20px;
    margin-left: 53px;
    margin-bottom: 40px;
  }

  .sclist:hover {
    transform: translateY(-20px);
    box-shadow: 0px 4px 5px #dfdfdf;
  }

  .sclistimg {
    width: 100%;
    height: 300px;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .sclistword {
    font-size: 15px;
    text-indent: 2em;
    width: 100%;
    height: 60px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    padding: 0 10px;
    box-sizing: border-box;
  }

</style>
