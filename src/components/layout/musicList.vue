<template>
    <div class="play-list" :class="{showList:isShow}">
        <p class="title">当前播放</p>
        <div class="list-wrapper" style="border-bottom:0.1rem solid #ccc">
            <p class="list-content">歌曲名</p>
            <p class="list-content">演唱者</p>
        </div>
        <div class="list-wrapper" v-for="(item,index) in musicList" :key="item.id" @dblclick="OnclickSong(item.id)" :class="selcetMusic(index)">
            <p class="list-content">{{item.name}}</p>
            <p class="list-content">{{item.artist}}</p>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'musicList',
    computed:{
        ...mapState({
            musicList:state=>state.player.musicList,
            currentSongIndex:state=>state.player.currentIndex
        }),
    },
    props:{
        isShow:Boolean
    },
    methods: {
        OnclickSong(index){
            //将用户点击的歌曲列表下标合当前的歌曲列表传递给store
            this.$store.commit({
                type:'player/selectSongByIndex',
                index:index,
                list:this.musicList
            })
        },
        selcetMusic(index){
            if(index === this.currentSongIndex){
                return 'selectMusic'
            }
        }
    },
}
</script>

<style lang="stylus" scoped>
.play-list
    width 18rem
    height calc(100% - 6.625rem - 5rem)
    background-color #fff
    position absolute
    right 1rem
    bottom 5rem
    z-index 11
    border 0.2rem solid #ccc
    padding 0.8rem
    overflow-y auto
    transform translateX(120%)
    transition all 0.3s
    .title
        font-size 2rem
    .list-wrapper
        display flex
        .list-content
            font-size 1rem
            flex 1
            width 100%
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            margin 0.1rem 0
    .selectMusic
        color red
.showList
    transform translateX(0)
</style>