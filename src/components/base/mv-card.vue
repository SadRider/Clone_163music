<template>
    <div class="mvlist" @click="PlayMV(mv.id)">
        <div class="img-wrapper">
            <img v-lazy="mv.picUrl||mv.cover||mv.imgurl16v9" class="img-content">
            <span class="iconfont icon_play">&#xe64d;</span>
        </div>
        <div class="mv-content">
            <p class="mv-name">{{mv.name}}</p>
            <p class="artists">{{mv.artistName}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'MVCard',
    props:{
        mv:Object
    },
    methods: {
        PlayMV(id){
            this.$router.push({
                name:'videoplay',
                params:{
                    id
                }
            })
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

    .mvlist
        position relative
        overflow hidden
        float left
        width 18.25rem
        height 0
        padding-bottom 13.125rem
        .img-wrapper
            border-radius 0.5rem
            position absolute
            top 0
            left 0
            right 0
            bottom 3rem
          .img-content
            display block
            margin 0 auto
            height 100%
            border-radius 0.25rem
        .icon_play
            position absolute
            top 50%
            left 50%
            transform translate(-50%,-50%)
            color red
            font-size 1.5rem
            opacity 0
            transition all 0.3s
        &:hover
            .icon_play
                opacity 0.8
        .mv-content
            position absolute
            left 0
            right 0
            bottom 0.5rem
            .mv-name
                font-size 0.8rem
                ellipsis()
            .artists
                font-size 0.4rem
                color $mainColor
</style>