<template lang="">
  <div class="page-header-image">
    <div class="contain">
      <div class="newsline" @click="gonewsdetail(item._id)" v-for="(item,index) in msg">
        <p>{{item.newsTitle}}</p><span>{{item.releaseDate}}</span>
      </div>
    </div>
    <totop></totop>
  </div>
</template>
<script>
  import totop from './hometop.vue'
  export default {
    components: {
      totop
    },
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      gonewsdetail(id) {
        this.$router.push('/newsdetail?id=' + id)
      }
    },
    created() {
      this.$http.post('/users/allNews', {
        word: this.$route.query.searchWord
      }).then((res) => {
        console.log(res)
        if (res.status == 200 && res.statusText == "OK") {
          this.msg = res.data
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

    },
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

  .contain {
    width: 900px;
    margin: 80px auto 0;
    background: #f8f5f5;
    padding: 0 15px 20px;
    box-sizing: border-box;
    border-radius: 15px;
  }

  .newsline {
    width: 100%;
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    border-bottom: 1px solid #665c5c;
  }

  .newsline:hover {
    background: #c5c2b9;
    cursor: pointer;
    color: rgb(29, 92, 228);
  }

  .newsline p {
    display: inline-block;
    float: left;
    padding: 0 10px;
  }

  .newsline span {
    display: inline-block;
    float: right;
    margin-right: 15px;
    font-size: 13px;
  }

  .newsline::after {
    content: '';
    display: block;
    clear: both;
  }

</style>
