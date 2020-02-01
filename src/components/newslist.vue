<template lang="">
    <div>
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
    components:{totop},
    data() {
        return {
            msg:''
        }
    },
    methods: {
        gonewsdetail(id){
            this.$router.push('/newsdetail?id='+id)
        }
    },
    created() {
        this.$http.post('/users/allNews').then((res) => {
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
    .contain{
        width: 900px;
        margin: 80px auto 0;
        background: #dfdfdf;
        padding: 0 15px 20px;
        box-sizing: border-box;
        border-radius: 15px;
    }
   .newsline{
       width: 100%;
       height: 60px;
       font-size: 20px;
       line-height: 60px;
       border-bottom: 1px solid #665c5c;
   }
   .newsline:hover{
       background: #e7b612;
       cursor: pointer;
       color: rgb(223, 75, 75);
   }
   .newsline p {
       display: inline-block;
       float: left;
       padding: 0 10px;
   }
   .newsline span{
       display: inline-block;
       float:right;
       margin-right: 15px;
   }
   .newsline::after{
       content: '';
       display: block;
       clear: both;
   }
</style>