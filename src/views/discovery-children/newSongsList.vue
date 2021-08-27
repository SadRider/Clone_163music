<template>
    <div class="songlist-container">
        <p class="title">最新音乐</p>
        <div class="songlist-wrapper">
            <div class="songlist" v-for="(songs,index) in songsList" :key="songs.id" @click="OnclickSong(songs.id)">
                <span class="num">{{index+1}}</span>
                <div class="img-wrapper">
                    <img v-lazy="songs.picUrl" class="img-content">
                    <span class="iconfont icon_play">&#xe64d;</span>
                </div>
                <div class="song-content">
                    <p class="song-name">{{songs.name}}</p>
                    <p class="artists">{{songs.artist}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getNewSongs } from '../../api/discovery'
export default {
    name:'NewSongsList',
    data() {
        return {
            songsList:[]
        }
    },
    methods: {
        getNewSongs(){
            getNewSongs().then(res=>{
                // this.songsList = res.result
                const newData=res.result.map(item=>({
                    id:item.id,
                    name:item.name,
                    picUrl:item.picUrl,
                    artist:item.song.artists.map(artItem=>artItem.name).join('，'),
                    company:item.song.album.company
                }))
                this.songsList = newData
            })
        },
        OnclickSong(id){
            //将用户点击的歌曲列表下标合当前的歌曲列表传递给store
            this.$store.commit({
                type:'player/selectSongByIndex',
                id,
                list:this.songsList
            })
        }
    },
    created() {
        this.getNewSongs()
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';

.title
    font-size 1.5rem
    margin 0.3rem
.songlist-wrapper
    display flex
    flex-direction column
    flex-wrap wrap
    width 100%
    height 31.25rem
    float left
    cursor pointer
    .songlist
        display flex
        width 50%
        height 6.25rem
        box-sizing border-box
        padding 0.625rem
        .num
            width 1.5rem
            height 5rem
            line-height 5rem
        .img-wrapper
            width 5rem
            height 5rem
            float left 
            position relative
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
                font-size 2rem
                opacity 0.7
                text-align center
                height 5rem
                line-height 5rem
        &:hover
            background-color $activeColor
        .song-content
            margin 1rem
            .song-name
                font-size 1rem
            .artists
                font-size 0.8rem
                color $mainColor
</style>