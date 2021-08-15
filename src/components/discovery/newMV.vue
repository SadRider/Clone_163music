<template>
<div class="MVcontainer">
    <p class="title">最新MV</p>
    <div class="mvlist-wrapper">
        <div class="mvlist" v-for="mv in MVList" :key="mv.id">
            <div class="img-wrapper">
                <img :src="mv.picUrl" class="img-content">
                <span class="iconfont icon_play">&#xe64d;</span>
            </div>
            <div class="mv-content">
                <p class="mv-name">{{mv.name}}</p>
                <p class="artists">{{mv.name}}</p>
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
                // console.log(res)
                this.MVList = res.result
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
    height 12rem
    .mvlist
        flex 1
        width 100%
        height 100%
        box-sizing border-box
        padding 0.625rem
        .img-wrapper
            background-color green
            width 14.375rem
            height 8.085rem
            position relative
            left 50%
            transform translateX(-50%)
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
                height 8.085rem
                line-height 8.085rem
                transition all 0.3s
        &:hover
            .icon_play
                opacity 0.8
        .mv-content
            font-size 0.8rem
</style>