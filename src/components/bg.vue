<template>
  <div class="maincontent" style="">
    <div class="fixedbg" ref="fixedbg" :style="{backgroundImage : 'url(' + bgurl + ')', backgroundSize:imagesize, backgroundPosition:imageposition}">
      <div class="mask-fixedbg" style="
      background: -webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0, 0, 0, 0) 10%, rgb(34, 45, 57) 90%);
      opacity: 0.9;">
      </div>
    </div>
  </div>
</template>
<style>
  .fixedbg {
    position: fixed;
    z-index: -2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
  }
  .fixedbg.load:before, .fixedbg:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #222;
  }
  .fixedbg .mask-fixedbg {
    position: fixed;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .fixedbg:before {
    opacity: 0;
    visibility: hidden;
    transition: all .5s;
  }
</style>
<script type="text/ecmascript-6">
  import storage from '../common/cookie'
  import {CompareDate,formatDate} from '../common/common.js'
  import config from '../http/config'
    export default {
      name: 'bg',
      data () {
          return {
            imagesize: 'cover',
            imageposition: 'center center',
            bgurl:''
          }
      },
      computed:{//计算属性 一般会在组件的计算属性（computed）获取state的数据（因为，计算属性会监控数据变化，一旦发生改变就会响应）
        getbgurl(){
          return this.$store.getters.getBgImgUrl
        }
      },
      watch: {
        getbgurl: function (val) {
          this.bgurl=val;
        },
      },
      mounted(){
        var now=formatDate(new Date(),'yyyy-MM-dd');
        var that=this;
        var path=this.$route.path.replace("/","")
        var url=that.$store.state.audio.currentAudio.picurl;
        if(url){
          that.bgurl=url;
        }else{
          var bgurl=storage.getStorage("bgurl");
          var bgtime=storage.getStorage("bgtime");
          if(bgurl==null||bgtime==null||CompareDate(now,bgtime)){
            return this.kcAjax.Query('/bg/bing').then(result=>{
              if(result.url){
                that.$store.dispatch('set_BgImgUrl',config.baseURL+'/bg/'+result.url)
                storage.setStorage("bgurl",config.baseURL+'/bg/'+result.url);
                storage.setStorage("bgtime",now);
                that.bgurl=that.$store.getters.getBgImgUrl;
              }
            })
          }else{
            that.$store.dispatch('set_BgImgUrl',bgurl);
            that.bgurl=that.$store.getters.getBgImgUrl;
          }
        }
      }
    }

</script>
