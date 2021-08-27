<template>
    <div class="play-list">
        <p class="title">当前播放</p>
        <div class="list-wrapper" style="border-bottom:0.1rem solid #ccc">
            <p class="list-content">歌曲名</p>
            <p class="list-content">演唱者</p>
        </div>
        <div class="list-wrapper" v-for="(item,index) in musicList" :key="item.id" @dblclick="OnclickSong(item.id)" :class="selcetMusic(index)">
            <p class="list-content">{{item.name}}</p>
            <p class="list-content">{{item.artist||item.artists}}</p>
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
    methods: {
        OnclickSong(id){
            console.log(id)
            //将用户点击的歌曲列表下标合当前的歌曲列表传递给store
            this.$store.commit({
                type:'player/selectSongByIndex',
                id,
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
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.play-list
    width 19rem
    height 51.3rem
    background-color #fff
    position absolute
    right 0
    bottom 5rem
    z-index 12
    border 0.2rem solid $mainColor
    padding 0.8rem
    overflow-y auto
    transition all 0.3s
    .title
        font-size 2rem
    .list-wrapper
        display flex
        cursor pointer
        .list-content
            font-size 1rem
            flex 1
            width 100%
            ellipsis()
            margin 0.1rem 0
    .selectMusic
        color red
</style>