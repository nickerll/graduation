import Vue from 'vue'

export default{
  install(){
     Vue.prototype.commonUtil = {
       getImgPath:function(path){
          if (path) {
            path = path.replace(/\\/g,'/')
            return path
          }else{
            return ''
          }
       }
     }
  }
}
