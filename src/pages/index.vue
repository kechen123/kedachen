<template>
  <div>
    <div class="h_body">
      <div class="h_content">
        <!--<img src="../assets/image/head.png">-->
        <div class="h_name">柯大晨</div>
        <div class="h_sign">{{sign}}</div>
        <!--<a class="h_btn" @click="goMyBlog">My Blog →</a>-->
      </div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
  export default {
    name: 'index',
    data () {
      return {
        name: '',
        sign:'',
        k:0,
        timer: 0,
        show: true
      }
    },
    components: {},
    methods: {
      goMyBlog(){
        this.$router.push({name: 'blog',params:{ }});
      },
      typing() {
        var sign="从你叫什么名字开始，后来，有了一切";
        if(this.name==name){
          if (this.k<= sign.length) {
            this.sign = sign.slice(0, this.k++) ;
            this.timer = setTimeout(() => {
              this.typing();
            }, 200);
          } else {
            clearTimeout(this.timer)
          }
        }
      }
    },
    created(){

    },
    mounted(){
            this.typing()
    }
  }
</script>
<style lang="less">
  @import "../assets/less/index.less";
</style>
