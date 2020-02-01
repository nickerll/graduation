<template lang="">
  <div>
    <div class="backhome">
      <span @click="gohome"><i class="el-icon-s-home"></i></span>
      <span @click="totop"><i class="el-icon-arrow-up"></i></span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        gotopo: false
      }
    },
    methods: {
      gohome() {
        this.$router.push('/')
      },
      gotop(e) {
        let scrolltop = e.target.scrollTop
        scrolltop > 30 ? (this.gotopo = true) : (this.gotopo = false)
      },
      totop() {
        let top = document.documentElement.scrollTop || document.body.scrollTop
        const timetop = setInterval(() => {
          document.body.scrollTop = document.documentElement.scrollTop = top -= 50
          if (top <= 0) {
            clearInterval(timetop)
          }
        }, 10);
      },
    },
    mounted() {
      window.addEventListener("scroll", this.gotop, true)
    },
    created() {

    },
    updated() {

    },
    destroyed() {

    },
  }

</script>
<style lang="">
    .backhome{
    position: fixed;
    right: 100px;
    bottom: 50px;
    font-size: 20px;
    color: #837474;
  }
  .backhome span{
    display: block;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .backhome span:hover{
    color: black;
  }
</style>
