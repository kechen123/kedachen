<template>
    <div class="songs">
      <div class="songs_content">
        <!--<div class="song_item song_title">-->
          <!--<div class="song_index">&nbsp;</div>-->
          <!--<div class="song_name">歌曲</div>-->
          <!--<div class="song_artist">专辑</div>-->
          <!--<div class="song_duration">时长</div>-->
        <!--</div>-->
        <div class="song_item" :class="{ active: song.id==audios.id }" @click.stop="songClick(song)" v-for="(song,index) in songs" :key="song.id">
          <!--:class="song.index==index?'now_play':''"-->
          <div class="song_index" :class="{ now_play: song.id==audios.id }" >{{index+1}}</div>
          <div class="song_name">
            <span class="song_adddfavourite" @click.stop="favourite(song)" ></span>
            {{song.name}} - 歌手: {{song.singer}}
          </div>
          <div v-if="song.playCount" class="song_artist">{{song.playCount}}</div>
          <div v-if="!song.playCount" class="song_artist">{{song.album}}</div>
          <div class="song_duration">{{song.playTime}}</div>
        </div>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'HelloWorld',
      data () {
          return {
            active: 0,
            isActive:true,
            audios:{}
          }
      },
      props: {
        songs:{
          type:Array,
        },
        itemClick:{
          type:Function,
        },
        addFavourite:{
          type:Function,
        },
      },
      computed:{//计算属性 一般会在组件的计算属性（computed）获取state的数据（因为，计算属性会监控数据变化，一旦发生改变就会响应）
        getaudios(){
          return this.$store.getters.getCurrentAudio
        }
      },
      watch: {
        getaudios: function (val) {
          this.audios=val;
        },
      },
      methods:{
        async songClick(song){
          this.active=song.index;
          song.lyrics=await this.httplist.getSongLyric({id:song.id})
          song.url=await this.httplist.getSongDetail({id:song.id});
          this.itemClick(song)
        },
        favourite(song){
          this.addFavourite(song)
        }
      }
    }
</script>
<style lang="less">
  @import "../assets/less/song_list.less";
</style>
