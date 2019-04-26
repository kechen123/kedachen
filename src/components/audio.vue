<template>
  <div class="di main-wrap" >

    <!-- 这里设置了ref属性后，在vue组件中，就可以用this.$refs.audio来访问该dom元素 -->

    <audio ref="audio" class="dn" autoplay="autoplay"
           :src="theUrl" :preload="audio.preload"
           @play="onPlay"
           @error="onError"
           @waiting="onWaiting"
           @ended="onended"
           @pause="onPause"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
    ></audio>

    <div >


      <div class="a_body">
        <div class="a_content">
          <div class="operation">
            <div class="back-box" @click="before">
              <img src="../assets/image/before.png" width="100%" alt="">
            </div>
            <div class="play-bt"  @click="startPlayOrPause">
              <img :src="audio.playing | transPlayPause" width="100%" alt="">
            </div>
            <!-- <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button> -->

            <div class="forward" @click="after">
              <img src="../assets/image/after.png" width="100%" alt="">
            </div>


          </div>
          <div class="boxs">
            <div class="song-info">
              <span class="aplayer-title">{{title}}&nbsp;&nbsp;by:{{singer}}</span>
              <span class="aplayer-author">{{artist}}</span>
            </div>
            <div class="track">
              <!-- <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag> -->

              <div class="sliders-box">
                <!--<el-slider v-show="!controlList.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider>-->
                <div class="slider">
                  <div class="duration">
                    <div class="buffering"  :style="{width:bufferingP+'%'}"></div>
                    <div class="real" :style="{width:sliderTime+'%'}"></div>
                  </div>
                  <div class="range" :style="{left:sliderTime+'%'}"></div>
                </div>
              </div>
              <div class="times startT">{{ audio.currentTime | formatSecond}} </div>
              <div class="times endT">
                {{ audio.maxTime | formatSecond }}
              </div>
              <!-- <el-tag type="info">{{ audio.maxTime | formatSecond }}</el-tag> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  function realFormatSecond(second) {
    var secondType = typeof second

    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)

      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60

      //   return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '00:00'
    }
  }

  export default {
    props: {
      theUrl: {
        type: String,
        required: true,
      },
      title:{
        type: String,
        required: true,
      },
      artist:{
        type: String,
        required: true,
      },
      singer:{
        type: String,
        required: true,
      },
      theSpeeds: {
        type: Array,
        default () {
          return [1, 1.5, 2]
        }
      },
      //上一首
      beforeSong:{
        type:Function,
      },
      //下一首
      afterSong:{
        type:Function,
      },
      //播放结束
      ended:{
        type:Function,
      },
    },
    name: 'VueAudio',
    data() {
      return {
        L:0,
        url: this.theUrl,
        audio: {
          currentTime: 0,
          maxTime: 0,
          playing: true,  //是否自动播放
          muted: false,   //是否静音
          speed: 1,
          waiting: true,
          preload: 'auto'

        },
        bufferingP:0, //缓冲进度
        sliderTime: 0,
        volume: 100,
        speeds: this.theSpeeds,

        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: false,
          // 不要快进按钮
          noSpeed: false,

        }
      }
    },
    methods: {
      before(){
        this.beforeSong();
      },
      after(){
        this.afterSong();
      },
      changeSpeed() {
        let index = this.speeds.indexOf(this.audio.speed) + 1
        this.audio.speed = this.speeds[index % this.speeds.length]
        this.$refs.audio.playbackRate = this.audio.speed
      },
      startMutedOrNot() {
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
      },
      // 音量条toolTip
      formatVolumeToolTip(index) {
        return '音量条: ' + index
      },
      // 进度条toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
      },
      // 播放跳转
      changeCurrentTime(index) {


        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      // 当音频暂停
      onPause () {
        this.audio.playing = false
      },
      // 当发生错误, 就出现loading状态
      onError () {
        this.audio.waiting = true
      },
      // 当音频开始等待
      onWaiting (res) {
        console.log(res)
      },
      // 当音频开始播放
      onPlay (res) {
        // console.log(res)
        this.audio.playing = true
        this.audio.loading = false

        if(!this.controlList.onlyOnePlaying){
          return
        }

        let target = res.target

        let audios = document.getElementsByTagName('audio');

        [...audios].forEach((item) => {
          if(item !== target){
          item.pause()
        }
      })
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        // console.log('timeupdate')
        //console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = this.audio.currentTime / this.audio.maxTime * 100
        var ele=this.$refs.audio;
        const durationT = Math.floor(ele.duration)
        var that=this;
        if(that.bufferingP<100){
          try {
            if (ele.buffered.length > 0) {
              var bufferedT = 0
              for (var i = 0; i < ele.buffered.length; i++) {
                bufferedT += ele.buffered.end(i) - ele.buffered.start(i)
                if (bufferedT > durationT) {
                  bufferedT = durationT
                  console.log('缓冲完成')
                }
              }
              var bufferedP = Math.floor((bufferedT / durationT) * 100)
              that.bufferingP = bufferedP
            }
          } catch (e) {
            return
          }
        }

      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之onTimeupdate类的数据
      onLoadedmetadata(res) {
        console.log('loadedmetadata')
        console.log(res)
        this.audio.waiting = false;
        this.audio.maxTime = parseInt(res.target.duration);

        //this.audio.maxTime = parseInt( this.$refs.audio.duration);
        console.log("总时间",this.$refs.audio.duration);
        this.$emit("loading-true",11);
      },
      add () {
        //前进15s

        let current_t = parseInt(this.$refs.audio.currentTime);
        let total_t = parseInt( this.$refs.audio.duration);
        //console.log(this.$refs.audio);
        this.$refs.audio.currentTime = (current_t + 15) >= total_t ? total_t : ( current_t + 15 );
        console.log(current_t, total_t, this.$refs.audio.currentTime);
        // console.log(this.$refs.audio.played);

      },
      minus () {
        //后退15秒
        let current_t = parseInt(this.$refs.audio.currentTime);

        this.$refs.audio.currentTime = (current_t - 15) <= 0 ? 0 : ( current_t - 15 );
      },
      onended(){
        //播放结束
        this.ended();
      },
    },
    watch: {

    },
    filters: {
      formatSecond(second = 0) {
        return realFormatSecond(second)
      },
      transPlayPause(value) {
        // console.log(value);
        return value ? require("../assets/image/zt.png") : require("../assets/image/bf.png")
      },
      transMutedOrNot(value) {

        return value ? '放音' : '静音'
      },
      transSpeed(value) {
        return '快进: x' + value
      }
    },
    watch :{
      url (val,oldval){
        console.log(val,oldval);
      },
      sliderTime (val,oldval){
        // console.log(val,oldval);
        if(val >= 98){
          this.L = 98;
          return
        }
        this.L = val;

      }
    },
    created() {
       let audio = new Audio();
       audio.src = this.url; //audio链接
       audio.addEventListener('loadedmetadata', function() {
           console.log(audio.duration);
           //
       });
      console.log('audio create>>>>>>>')
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .a_body{
    width: 100%;
    /*background: #81e0b2;*/
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .a_content{
    display: flex;
    justify-content: center;
    flex-wrap:nowrap;
  }
  .boxs{
    width: 100%;
  }
  .track{
    border-radius:20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
  }

  .times{
    color:#fff
  }
  .startT{
    padding-left: 30px;
    font-size: 14px;
  }
  .endT{
    padding:0 10px;
    font-size: 14px;
  }
  .operation{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 20px;
  }
  .play-bt{
    cursor: pointer;
    font-size: 0;
    width: 60px;
    height: 60px;

  }
  .back-box{
    margin-right: 20px;
    cursor: pointer;
  }
  .forward {
    cursor: pointer;
    margin-left: 20px;
  }
  .back-box,.forward{
    font-size: 0;
    width: 40px;
    height: 40px;

  }
  .song-info{
    height: 36px;
    line-height: 36px;
    text-align: left;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 5px;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    cursor: default;
    padding-bottom: 2px;
  }
  .aplayer-title {
    font-size: 14px;
    color: #FFF;
  }
  .aplayer-author {
    font-size: 12px;
    color: #FFF;
  }
  .sliders-box{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items:center;
  }

  .div_box{
    height: 100px;
    position: relative;
  }
  .div0{width: 10px;height: 10px;border-radius: 5px;background: red;position: absolute;top: 0;}
  .main-wrap{
    padding: 10px 15px;
  }
  .slider {
    background: rgba(0,0,0,0.3);
    height: 2px;
    display: inline-block;
    width:100%;
    position: relative;
    margin-left: 10px;
  }
  .duration{
    width: 100%;
    height: 2px;
    position: relative;
    background: hsla(0,0%,100%,.1);
    border-radius: 1px;
  }
  .range{
    width: 6px;
    height: 6px;
    margin-top: -3px;
    margin-left: 0;
    border-radius: 50%;
    background-color: #f4c2ec;
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 2;
    cursor: pointer;
  }
  .range:before{
    content: " ";
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: radial-gradient(transparent 20%,hsla(0,0%,100%,.6) 50%,transparent 60%);
    top: 50%;
    margin-top: -12px;
    margin-left: -9px;
    cursor: pointer;
    outline: 0;
    -webkit-tap-highlight-color: transparent;
  }
  .buffering{
    width: 20%;
    height: 100%;
    background: hsla(0,0%,100%,.2);
    border-radius: 1px;
    position: absolute;
    top: 0;
    left: 0;
    transition: width .3s;
  }
  .real{
    width: 10%;
    position: absolute;
    height: 100%;
    left: 0;
    background: #f4c2ec;
    border-radius: 1px;
  }

  /* .di {
    display: inline-block;
  } */

  .download {
    color: #409EFF;
    margin-left: 15px;
  }

  .dn{
    display: none;
  }
  @media print, screen and (max-width: 48em) {
    .operation{
      width: 100%;
      justify-content:space-around;
    }
    .boxs{
      width: 100%;
    }
    .a_content{
      display: flex;
      justify-content: center;
      flex-wrap:wrap;
    }
  }
</style>
