<template>
    <div class="lyrics_body">
      <div class="song_img">
        <img :src="audio.picUrl"/>
        <span class="msk"></span>
      </div>
      <div class="lyric-content">
        <p class="song_item" @click="songClick(song)" v-for="(lyrics,index) in audio.lyrics" :key="index">{{lyrics}}</p>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'HelloWorld',
      data () {
        return {
          audio:this.$store.getters.getCurrentAudio,
        }
      },
      props: {
        lyrics:{
          type:String,
        },
        image:{
          type:String
        }
      },
      computed:{//计算属性 一般会在组件的计算属性（computed）获取state的数据（因为，计算属性会监控数据变化，一旦发生改变就会响应）
        getAudio(){
          return this.$store.getters.getCurrentAudio
        }
      },
      watch: {
        getAudio: function (val) {
          this.audio=val;
        },
      },
    }
</script>
<style lang="less">
  @import "../assets/less/lyrics.less";
</style>
