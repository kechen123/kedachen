<template>
    <div>
      <div class="fixedbg music_bg" ref="fixedbg" :style="{background: 'url(' + audios.picUrl + ') center center / cover no-repeat'}">
        <div class="mask-fixedbg" style="
      background: -webkit-radial-gradient(50% 50%, ellipse closest-corner, rgba(0, 0, 0, 0) 10%, rgb(34, 45, 57) 90%);
      opacity: 0.9;">
        </div>
      </div>
      <div class="m163_body">
        <div class="m163_menu">
          <div class="m163_menu_item" :class="{ m163_menu_item_active: active==1 }" @click="recommendClick">日推</div>
          <div class="m163_menu_item" :class="{ m163_menu_item_active: active==2 }" @click="playListClick">播放列表</div>
          <div class="m163_menu_item" :class="{ m163_menu_item_active: active==3 }" @click="rankClick">听歌排行</div>
          <div class="m163_menu_item" :class="{ m163_menu_item_active: active==4 }" @click="mySongListClick">我的歌单</div>
        </div>
        <div class="m163_content">
          <div class="m163_music">
            <song_list :songs="songs" :itemClick="itemClick" :addFavourite="addFavourite"></song_list>
          </div>
          <div class="m163_lyrics">
            <div class="songs_lyrics">
              <lyrics></lyrics>
            </div>
          </div>
        </div>
        <VueAudio v-if="audios.url"  :title="audios.name" :artist="audios.album" :singer="audios.singer" :beforeSong="before" :afterSong="after" :ended="ended" :theUrl="audios.url" />
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import VueAudio from '../components/audio.vue'
  import song_list from '../components/song_list.vue'
  import lyrics from '../components/lyrics.vue'
    export default {
        name: 'HelloWorld',
        data () {
            return {
              audios: {//当前播放歌曲信息
              },
              songs:[],//当前播放列表
              user:{//用户信息
                "wyy_head":'',
                "wyy_id":'',
              },
              active:1,
              activeNames: ['2'],
              rankIndex:1,//1 排行 0 所有排行
              rankData: [],//听歌排行
              createSongList:{},//我创建的歌单
              collectionSongList:{},//我收藏的歌单
              daysongs:[],
            }
        },
      components: {
        VueAudio,song_list,lyrics
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
      mounted(){
        var that=this;
        this.kcAjax.Query('/163/login/status').then(result=>{
          that.updateUser(result);
          that.getUserDetail();
//          this.playlist();
          that.recommendClick();
        }).catch(answer => {
          that.login(111)
        })
      },
      methods:{
        //日推
        async recommendClick(){
          var rt=this.$store.getters.getMusicRiTui;
          this.active=1;
          if(!rt||rt.length==0){
            var ritui=await this.httplist.getdaysongs()
            this.$store.dispatch('set_MusicRiTui',ritui)
            this.songs=ritui;
          }else{
            this.songs=rt;
          }
        },
        //播放列表
        playListClick(){
          this.active=2;
          var pl=this.$store.getters.getMusicPlayList;
          this.songs=pl;
        },
        //听歌排行
        async rankClick(){
          this.active=3;
          var ph=this.$store.getters.getMusicUserRecord;
          if(!ph||ph.length==0){
            let uid=this.$storage.getStorage("wyy_id");
            var paihang=await this.httplist.getUserRecord(uid,1)
            this.$store.dispatch('set_MusicUserRecord',paihang);
            this.songs=paihang;
          }else{
            this.songs=ph;
          }
        },
        //我的歌单
        mySongListClick(){
          this.active=4;
        },
        itemClick(song){
          if(this.active!=2){
            var bflist=this.$store.getters.getMusicPlayList;
            bflist.push(song)
            this.$store.dispatch('set_MusicPlayList',bflist)
          }
          this.$store.dispatch('set_CurrentAudio',song)
        },
        addFavourite(song){
          if(this.active!=2){
            var bflist=this.$store.getters.getMusicPlayList;
            bflist.push(song)
            this.$store.dispatch('set_MusicPlayList',bflist)
          }
        },
        //登录
        login(phone,pwd){
          var data={}
          if(phone===111){
            data.isme=1;
          }else{
            data={phone:phone,password:pwd}
          }
          this.$storage.removeStorage("wyy_head");
          this.$storage.removeStorage("wyy_name");
          this.$storage.removeStorage("wyy_id");
          this.$storage.removeStorage("_");
          this.kcAjax.Query('/163/login/cellphone',data).then(result=>{
            if(result._){
              this.$storage.setStorage("_",result._);
              this.$storage.setStorage("wyy_head",result.profile.avatarUrl);
              this.$storage.setStorage("wyy_name",result.profile.nickname);
              this.$storage.setStorage("wyy_id",result.profile.userId);
              this.user.wyy_head=result.profile.avatarUrl;
              this.user.wyy_name=result.profile.nickname;
              this.user.wyy_id=result.profile.userId;
              this.updateUser(result);
              this.getUserDetail();
//              this.playlist();
              this.recommendClick();
            }else{
             console.log('登录失败,请检查您的账号密码是否正确');
              return;
            }
          }).catch(answer => {
            console.log('登录失败,请检查您的账号密码是否正确');
            return;
          })
        },
        updateUser(result){
          this.$storage.setStorage("wyy_head",result.profile.avatarUrl);
          this.$storage.setStorage("wyy_name",result.profile.nickname);
          this.$storage.setStorage("wyy_id",result.profile.userId);
          this.user.wyy_head=result.profile.avatarUrl;
          this.user.wyy_name=result.profile.nickname;
          this.user.wyy_id=result.profile.userId;
        },
        //用户详情
        getUserDetail(){
//          this.kcAjax.Query('/163/user/detail',{uid:this.user.wyy_id}).then(result=>{
//
//          })
        },
        //获取用户歌单
        playlist(){
          if(!this.user.wyy_id||this.user.wyy_id==''){
            this.$message.error('用户没有登录');
            return;
          }
          this.kcAjax.Query('/163/user/playlist',{uid:this.user.wyy_id}).then(result=>{
            let data=result.playlist;
            let uid=this.$storage.getStorage("wyy_id");
            let create={
              count:0,
              list:[]
            }
            let collection={
              count:0,
              list:[]
            }
            for(let i =0;i<data.length;i++){
              if(data[i].userId==uid){
                create.count++;
                create.list.push({
                  name:data[i].name,
                  playCount:data[i].playCount,
                  coverImgUrl:data[i].coverImgUrl,
                })
              }else{
                collection.count++;
                collection.list.push({
                  name:data[i].name,
                  playCount:data[i].playCount,
                  coverImgUrl:data[i].coverImgUrl,
                })
              }
            }
            this.createSongList=create;
            this.collectionSongList=collection;
          })
        },
//        //每日推荐歌曲
//        getdaysongs(){
//          var that=this;
//          this.httplist.getdaysongs(ritui=>{
//            that.songs=ritui;
//            this.$store.dispatch('set_MusicRiTui',ritui)
//          });
//        },
        before(){
          //上一首
          console.log('上一首>>>>>>>>>>');
          this.getbeforeAndAfter(1)
        },
        after(){
          //下一首
          console.log('下一首>>>>>>>>>>');
          this.getbeforeAndAfter(2)
        },
        ended(){
          //播放结束
          console.log('播放结束>>>>>>>>>>');
        },
        //我喜欢的音乐
        favourite(){

        },
        getSongIndex(arr,song){
          for(let i=0;i<arr.length;i++){
            if(arr[i].id==song.id){
              return i;
            }
          }
          return false;
        },
        //上一首 : 1/下一首 :2
        async getbeforeAndAfter(type){
          var list=this.songs;
          var nowMusic=this.$store.getters.getCurrentAudio;
          var index=this.getSongIndex(list,nowMusic);
          var obj={}
          //处理临界值
          if(index==0){//第一首
            if(type==1){
              obj=list[list.length-1];
            }else{
              obj=list[index+1];
            }
          }else if(index==list.length){//最后一首
            if(type==1){
              obj=list[index-1];
            }else{
              obj=list[0];
            }
          }else{
            if(type==1){
              obj=list[index-1];
            }else{
              obj=list[index+1];
            }
          }
          if(this.active!=2){
            var bflist=this.$store.getters.getMusicPlayList;
            var has=this.getSongIndex(bflist,obj);
            if(has===false){
              bflist.push(obj);
              this.$store.dispatch('set_MusicPlayList',bflist)
            }
          }
          obj.lyrics=await this.httplist.getSongLyric({id:obj.id})
          obj.url=await this.httplist.getSongDetail({id:obj.id});
          this.$store.dispatch('set_CurrentAudio',obj)
        }

      }
    }
</script>
<style lang="less">
  @import "../assets/less/163.less";
</style>
