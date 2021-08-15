<template>
    <div class="songlist-container">
        <p class="title">最新音乐</p>
        <div class="songlist-wrapper" v-for="(page,index) in pages" :key="index">
            <div class="songlist" v-for="songs in page" :key="songs.id">
                <div class="img-wrapper">
                    <img :src="songs.picUrl" class="img-content">
                    <span class="iconfont icon_play">&#xe64d;</span>
                </div>
                <div class="song-content">
                    <p class="song-name">{{songs.name}}</p>
                    <p class="artists">{{songs.name}}</p>
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
                console.log(res)
                this.songsList = res.result
            })
        },
    },
    computed:{
        pages(){
            const pages = []
            this.songsList.forEach((item,index)=>{
                const page = Math.floor(index/5)
                if(!pages[page]){
                    pages[page] = []
                }
                pages[page].push(item)
            })
            return pages
        }
    },
    created() {
        this.getNewSongs()
    },
}
</script>

<style lang="stylus" scoped>
.title
    font-size 1.5rem
    margin 0.3rem
.songlist-wrapper
    width 50%
    float left
    .songlist
        position relative
        width 100%
        height 6.25rem
        box-sizing border-box
        padding 0.625rem
        .img-wrapper
            background-color green
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
                opacity 0.8
                text-align center
                height 5rem
                line-height 5rem
        &:hover
            background-color #ccc
        .song-content
            float left
            margin 1.1875rem
</style>