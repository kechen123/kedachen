<template>
  <div id="app" style="overflow:-Scroll;overflow-y:hidden">
    <bg_url></bg_url>
    <c_title></c_title>
    <transition name="fade">
      <keep-alive>
        <router-view class="li_list"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  position: fixed;
}
.li_list{
  overflow:-Scroll;
  overflow-y:hidden;
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  transform:translate3d(0,0,0)
}

.fade-enter-to,.fade-leave-to {
  transition: all 0.8s
}
.fade-enter,.fade-leave-to{
  opacity:0;
  transform:translate3d(0,50px,0);
}
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: inset 0 0 0 5px hsla(0,0%,100%,.6);
}
::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {
  border-radius: 999px;
  border: 5px solid transparent;
}
::-webkit-scrollbar-track {
  box-shadow: inset 1px 1px 5px rgba(0,0,0,.2);
}
::-webkit-scrollbar-thumb, ::-webkit-scrollbar-track {
  border-radius: 999px;
  border: 5px solid transparent;
}
</style>
<style lang="less">
  @import "./assets/less/common.less";
</style>

