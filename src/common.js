import Vue from 'vue'

// console.log(window)
var basehref = window.location.origin
export default{
  install(){
     Vue.prototype.commonUtil = {
       getImgPath:function(path){
          if (path) {
            path = path.replace(/\\/g,'/')
            return basehref+'/'+'server/'+path
          }else{
            return ''
          }
       }
     }
  }
}
