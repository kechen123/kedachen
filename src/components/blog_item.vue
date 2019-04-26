<template>
    <div class="card" @click='addQuery(blog)'>
        <header class="card__thumb">
            <a href="#"><img src="../assets/image/card.jpg"/></a>
        </header>
        <div class="card__body">
            <h2 class="card__title"><a href="#">{{blog.title}}</a></h2>
            <p class="card__description">{{blog.introduction}}</p>
        </div>

        <footer class="card__footer">
            <span class="icon ion-clock"></span> {{blog.create_time | formatDate}}
            <span class="icon ion-chatbox"></span><a href="#"> {{blog.comment_count}} 评论</a>
        </footer>
    </div>
</template>

<script type="text/ecmascript-6">
    import {formatDate} from '../common/common.js'
    export default {
        name: 'HelloWorld',
        data () {
            return {
                msg: ''
            }
        },
        components: {},
        methods:{
            addQuery(){

            }
        },
        props: {
            blog:{
                type:Object,
            }
        },
        filters:{
            formatDate(time){
                let date=new Date(time);
                return formatDate(date,'yyyy-MM-dd')
            }
        }
    }
</script>
<style lang="less">
    @import "../assets/less/blogItem.less";
</style>
