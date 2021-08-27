<template>
<div class="list-wrap"  @click="toPlayList(item.id)">
    <div class="desc-wrap" v-if="item.copywriter">
        <span class="desc">{{item.copywriter}}</span>
    </div>
    <div class="desc-wrap" v-else-if="item.playCount">
        <span class="desc">{{item.playCount|playCount}}</span>
    </div>
    <div v-else><span class="desc">畅听歌曲</span></div>
    <div class="list-img">
        <img v-lazy="item.picUrl||item.coverImgUrl" class="banner-img">
    </div>
    <span class="iconfont icon_play">&#xe64d;</span>
    <p class="list-name">{{item.name}}</p>
</div>
</template>

<script>
export default {
    name:'ListCard',
    props:{
        item:Object
    },
    filters:{
        playCount(value){
            if(value<=10000){
                return value+'次'
            }else{
                return Math.floor(value/10000)+'万次'
            }
        }
    },
    methods: {
        toPlayList(id){
            // console.log(id)
            this.$router.push({
                name:'playlist',
                params:{id}
            })
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.list-wrap
    position relative
    overflow hidden
    float left
    width 20%
    height 0
    padding-bottom 20%
    cursor pointer
    .desc-wrap
        position absolute
        margin 0 1rem
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
        bottom 2rem
        box-sizing border-box
        .banner-img
            display block
            margin 0 auto
            height 100%
            border-radius 1rem
    &:hover
        .desc-wrap
            transform translateY(0)
        .icon_play
            opacity 0.8
    .icon_play
        opacity 0
        position absolute
        right 1rem
        bottom 1.5rem
        font-size 2rem
        color red
        transition all 0.3s
        z-index 1
    .list-name
        position absolute
        margin 0 1rem
        left 0
        right 0
        bottom 0
        height 2rem
        line-height 2rem
        font-size 1rem
        text-align center
        color #333
        ellipsis()
</style>