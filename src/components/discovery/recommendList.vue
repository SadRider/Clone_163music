<template>
    <div class="recommend">
        <p class="title">推荐歌单</p>
        <el-carousel :interval="4000" class="banner-carousel" :autoplay="false" indicator-position="outside">
            <el-carousel-item v-for="(page,index) in pages" :key="index">
                <div class="list-wrap"  v-for="item in page" :key="item.id">
                    <div class="desc-wrap" v-show="item.copywriter">
                        <span class="desc">{{item.copywriter}}</span>
                    </div>
                    <div class="list-img">
                        <img v-lazy="item.picUrl" class="banner-img">
                    </div>
                    <span class="iconfont icon_play">&#xe64d;</span>
                    <p class="list-name">{{item.name}}</p>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { getRecommendList } from '../../api/discovery'
export default {
    name:'RecommendList',
    data() {
        return {
            recommendlist:[]
        }
    },
    computed:{
        pages(){
            const pages = []
            this.recommendlist.forEach((item,index)=>{
                const page = Math.floor(index/10)//向下取整
                if(!pages[page]){
                    pages[page] = []
                }
                pages[page].push(item)
            })
            return pages
        }
    },
    methods: {
        getRecommendList(){
            getRecommendList().then(res=>{
                console.log(res)
                this.recommendlist = res.result
            })
        }
    },
    created() {
        this.getRecommendList()
    },
}
</script>

<style lang="stylus" scoped>
.title
    font-size 1.5rem
    margin 0.3rem
/deep/.el-carousel__container//深度选择器，修改elementui样式
    width 100%
    height 0
    padding-bottom 40%
    overflow hidden
// background-color red
.list-wrap
    position relative
    overflow hidden
    float left
    width 20%
    height 0
    padding-bottom 20%
    // background-color #fff
    .desc-wrap
        position absolute
        margin 0 0.5rem
        padding 0.3rem
        left 0
        right 0
        top 0
        background-color rgba(0, 0, 0, 0.4)
        transform translateY(-100%)
        transition all 0.3s
        z-index 1
        .desc
            color #fff
    .list-img
        position absolute
        top 0
        left 0
        right 0
        bottom 1rem
        box-sizing border-box
        // padding 0.3rem
        // background-color green
        .banner-img
            display block
            margin 0 auto
            height 100%
            border-radius 0.25rem
    &:hover
        .desc-wrap
            transform translateY(0)
        .icon_play
            opacity 0.8
    .icon_play
        opacity 0
        position absolute
        right 0.55rem
        bottom 0.55rem
        font-size 2rem
        color red
        transition all 0.3s
        z-index 1
    .list-name
        position absolute
        left 0
        right 0
        bottom 0
        height 1rem
        line-height 1rem
        font-size .45rem
        text-align center
        color #333
        overflow :hidden
        white-space :nowrap
        text-overflow :ellipsis
</style>