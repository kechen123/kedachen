<template>
    <div class="b_html">
        <div class="b_body">
          <div class="b_content" >
              <blog_item  :blog="blog" v-for="blog in blogArr" :key="blog.id"></blog_item>
          </div>
          <div class="b_type">

          </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import blog_item from '../components/blog_item.vue'

    export default {
    name: 'home',
    data () {
      return {
        blogArr: []
      }
    },
    components: {blog_item},
    methods:{
    },
    mounted(){
        let that=this;
        this.kcAjax.Query('/ke/blog',{page:1,size:20}).then(result=>{
            if(result.code==200){
                for(let i =0;i<result.data.length;i++){
                    //if(result.data[i].title.length>15){
                    //    result.data[i].title=result.data[i].title.substring(0,15);
                    //}
                    if(result.data[i].introduction.length>50){
                        result.data[i].introduction=result.data[i].introduction.substring(0,50)+'...';
                    }
                }
            }
            that.blogArr=result.data;
        })

    },
  }
</script>
<style lang="less">
  @import "../assets/less/blog.less";
</style>
