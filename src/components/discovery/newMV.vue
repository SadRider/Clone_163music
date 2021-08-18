<template>
<div class="MVcontainer">
    <p class="title">最新MV</p>
    <div class="mvlist-wrapper">
        <div class="mvlist" v-for="mv in MVList" :key="mv.id">
            <div class="img-wrapper">
                <img v-lazy="mv.picUrl" class="img-content">
                <span class="iconfont icon_play">&#xe64d;</span>
            </div>
            <div class="mv-content">
                <p class="mv-name">{{mv.name}}</p>
                <p class="artists">{{mv.artistName}}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getPersonalizedMv } from '../../api/discovery'
export default {
    name:'NewMV',
    data() {
        return {
            MVList:[]
        }
    },
    methods: {
        getPersonalizedMv(){
            getPersonalizedMv().then(res=>{
                const newData = res.result.map(item=>({
                    id:item.id,
                    name:item.name,
                    picUrl:item.picUrl,
                    artistName:item.artistName
                }))
                this.MVList = newData
            })
        }
    },
    created() {
        this.getPersonalizedMv()
    },
    computed:{}
}
</script>

<style lang="stylus" scoped>
.title
    font-size 1.5rem
    margin 0.3rem
.mvlist-wrapper
    display flex
    width 100%
    .mvlist
        flex 1
        width 100%
        height 100%
        box-sizing border-box
        padding 0.625rem
        .img-wrapper
            width 17.5rem
            height 10rem
            border-radius 0.5rem
            position relative
            left 50%
            transform translateX(-50%)
            overflow hidden
          .img-content
                width 100%
                border-radius 0.5rem
            .icon_play
                position absolute
                top 0
                right 0
                bottom 0
                left 0
                color red
                font-size 1.5rem
                opacity 0
                text-align center
                height 11rem
                line-height 11rem
                transition all 0.3s
        &:hover
            .icon_play
                opacity 0.8
        .mv-content
            width 17.5rem
            .mv-name
                font-size 0.8rem
                overflow :hidden
                white-space :nowrap
                text-overflow :ellipsis
            .artists
                font-size 0.4rem
                color #ccc
</style>