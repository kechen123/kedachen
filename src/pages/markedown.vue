<template>
  <div class="fixedbg">
    <mavon-editor v-model="context" :toolbars="toolbars" @keydown="" />
    <div class="save-data" @click="addBlog">保存</div>
  </div>
</template>

<script>
    export default {
        name: "markedown",
      data(){
        return {
          context: '',//输入的数据
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            mark: true, // 标记
            superscript: true, // 上角标
            quote: true, // 引用
            ol: true, // 有序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            help: true, // 帮助
            code: true, // code
            subfield: true, // 是否需要分栏
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            /* 1.3.5 */
            undo: true, // 上一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            /* 1.4.2 */
            navigation: true // 导航目录
          }
        }
      },
      methods:{
        addBlog(){
          if(this.context==''){
            alert('不能为空');
            return;
          }
          this.kcAjax.Post('/ke/blog',{content:this.context}).then(res=>{
            debugger
          })
        }
      },
      mounted(){
        let that=this;
        var id=this.$route.query.id;
        this.kcAjax.Query('/ke/blog',{id:id}).then(result=>{
          if(result.code==200){
            that.context=result.data[0].content
          }

        })

      },
    }
</script>

<style scoped lang="less" >
  .fixedbg {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFF;
    .save-data{
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 10px;
      color: #fff;
      font-size: 18px;
      background: #6cd287;
      margin: 20px auto;
      cursor: pointer;
     }
  }

</style>
