<template>
  <div>
    <div class="t_body">
      <div class="t_content">
        <div class="t_left">{{myname}}</div>
        <div class="t_right">
          <div class="t_item" @click="goIndex" v-bind:class="{  t_item_hover: hoverIndex==0 }">首页</div>
          <div class="t_item" @click="goBlog" v-bind:class="{  t_item_hover: hoverIndex==1 }">博客</div>
          <div class="t_item" @click="go163" v-bind:class="{  t_item_hover: hoverIndex==2 }">网易云</div>
          <!--<div class="t_item" @click="goAbout" v-bind:class="{  t_item_hover: hoverIndex==3 }">关于</div>-->
          <div class="t_item" @click="goContact" v-bind:class="{  t_item_hover: hoverIndex==4 }">联系</div>
          <a href="https://github.com/kechen123" target="view_window">GitHub</a>
        </div>
        <div class="t_right_l" @click.stop="showMenu=!showMenu"></div>
      </div>
    </div>
    <div class="t_menus" v-if="showMenu" @click.stop="showMenu=!showMenu">
      <div class="menu_item" @click="goIndex" >首页</div>
      <div class="menu_item" @click="goBlog">博客</div>
      <div class="menu_item" @click="go163">网易云</div>
      <div class="menu_item" @click="goContact">联系</div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: 't_title',
    data () {
      return {
        myname: 'KeDaChen',
        hoverIndex:0,
        showMenu:false
      }
    },
    methods:{
      destroy:function(){
        this.$destroy()
      },
      goIndex (){
        this.hoverIndex=0;
        this.$router.push({name: 'index',params:{ }});
      },
      goBlog (){
        this.hoverIndex=1;
        this.$router.push({name: 'blog',params:{ }});
      },
      go163 (){
        this.hoverIndex=2;
        this.$router.push({name: '163',params:{ }});
      },
      goAbout (){
        this.hoverIndex=3;
        this.$router.push({name: 'about',params:{ }});
      },
      goContact (){
        this.hoverIndex=4;
        this.$router.push({name: 'contact',params:{ }});
      },
    },
    beforeCreate:function(){

      console.log('beforeCreate:刚刚new Vue()之后，这个时候，数据还没有挂载呢，只是一个空壳')
      console.log(this.msg)//undefined
      console.log(document.getElementsByClassName("myp")[0])//undefined
    },
    created:function(){
      var path=this.$route.path.replace("/","")
      if(path==""||path=='index'){
        this.hoverIndex=0;
      }else if(path=='blog'){
        this.hoverIndex=1;
      }else if(path=='163'){
        this.hoverIndex=2;
      }else if(path=='about'){
        this.hoverIndex=3;
      }else if(path=='contact'){
        this.hoverIndex=4;
      }
      console.log('created:这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发updated函数')
      console.log('在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取')
      console.log('接下来开始找实例或者组件对应的模板，编译模板为虚拟dom放入到render函数中准备渲染')
    },
    beforeMount:function(){
      console.log('beforeMount：虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated')
      console.log('在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取')
      console.log(document.getElementsByClassName("myp")[0])//undefined
      console.log('接下来开始render，渲染出真实dom')
    },
    // render:function(createElement){
    //     console.log('render')
    //     return createElement('div','hahaha')
    // },
    mounted:function(){
      console.log('mounted：此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了')
      console.log(document.getElementsByClassName("myp")[0])
      console.log('可以在这里操作真实dom等事情...')

      //    this.$options.timer = setInterval(function () {
      //        console.log('setInterval')
      //         this.msg+='!'
      //    }.bind(this),500)
    },
    beforeUpdate:function(){
      //这里不能更改数据，否则会陷入死循环
      console.log('beforeUpdate:重新渲染之前触发')
      console.log('然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟dom树利用diff算法进行对比之后重新渲染')
    },
    updated:function(){
      //这里不能更改数据，否则会陷入死循环
      console.log('updated:数据已经更改完成，dom也重新render完成')
    },
    beforeDestroy:function(){
      console.log('beforeDestory:销毁前执行（$destroy方法被调用的时候就会执行）,一般在这里善后:清除计时器、清除非指令绑定的事件等等...')
      // clearInterval(this.$options.timer)
    },
    destroyed:function(){
      console.log('destroyed:组件的数据绑定、监听...都去掉了,只剩下dom空壳，这里也可以善后')
    }
  }
</script>
<style lang="less">
  @import "../assets/less/title.less";
</style>
