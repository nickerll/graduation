<template lang="">
    <div class="lunbo">
        <transition-group tag="div">
            <div v-for="(item,index) in img" :key="index" :style="{opacity:(index+1) == n ? '1':'0'}" class="active">
                <img :src="item"/>
            </div>
        </transition-group>
    </div>
</template>
<script>
export default {
    data() {
        return {
            img:'',
            n:1,
            timer:''
        }
    },
    methods: {
        next(){
            this.clearT()
            this.n = this.n+1 == 6 ? 1 : this.n+1
            this.timeOut()
        },
        clearT(){
            clearTimeout(this.timer)
        },
        timeOut(){
            this.timer = setTimeout(() => {
                this.next()
            },3000);
        }
    },
    mounted() {
        this.$http({
            url:'../../static/index.json',
            method:"get"
        }).then((res) => {
            this.img = res.data.banner
        })
        this.timer = setTimeout(this.next,3000)
    },
}
</script>
<style lang="">
    .lunbo{
        max-width:1920px;
        min-width:1200px;
        height:500px;
        margin:0 auto;
        position:relative;
    }
    .lunbo img{
        width:100%;
        height:100%;
        position: absolute;
    }
    .active{
		transition: all 1s;
	}
	
</style>