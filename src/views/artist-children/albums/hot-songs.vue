<template>
    <div class="hotSong-wrapper">
        <div class="hot-left">
            <div class="cover-wra">
                <img v-lazy="getCover">
                <span class="title_1">TOP</span>
                <span class="title_2">50</span>
            </div>
        </div>
        <div class="hot-right">
            <div class="title">热门歌曲</div>
            <div class="list-wrapper" ref="wrapper">
                <table class="container">
                    <tr v-for="(item,index) in hotSongList" :key="item.id" @click="Clickplay(item.id)">
                        <td>{{index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.time}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {getHotSong_50} from '../../../api/artist'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
export default {
    name:"HotSong",
    props:{
        id:Number
    },
    data() {
        return {
            hotSongList:[],
            getCover:''
        }
    },
    methods: {
        getHotSong(){
            getHotSong_50(this.id).then(res=>{
                console.log(res)
                this.hotSongList=res.songs.map(item=>({
                            id:item.id,
                            name:item.name,
                            artist:item.ar.map(item=>item.name).join('/'),
                            albumID:item.al.id,
                            albumName:item.al.name,
                            picUrl:item.al.picUrl,
                            time:this.formatTime(item.dt)
                        }))
                this.getCover = res.songs[0].al.picUrl
            })
        },
        formatTime(value){
            //计算分钟
            value = value/1000
            let mins = Math.floor(value/60)
            let secend = Math.floor(value%60)
            if(mins<9){
                mins=("0"+mins)
            }
            if(secend<9){
                secend=("0"+secend)
            }
            return mins + ":" + secend
        },
        Clickplay(id){
            this.$store.commit({
                type:'player/selectSongByIndex',
                id,
                list:this.hotSongList
            })
        },
    },
    computed:{

    },
    created() {
        this.getHotSong()
        this.$nextTick(()=>{
            BScroll.use(MouseWheel)
            BScroll.use(ScrollBar)
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:false,
                mouseWheel: true,
                disableMouse:true,
                scrollY: true,
                scrollbar: true
            })
        })
    },
    mounted() {
        setTimeout(() => {
            this.scroll.refresh()
        }, 1000);
    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.hotSong-wrapper
    width 100%
    height 20rem
    display flex
    margin-bottom 3rem
    .hot-left
        width 25%
        height 100%
        position relative
        .cover-wra
            width 15rem
            height 15rem
            position absolute
            left 50%
            transform translateX(-50%)
            img
                width 100%
                border-radius 2.5rem
            .title_1
                font-size 4rem
                font-weight bold
                color #fff
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-100%)
            .title_2
                font-size 4rem
                font-weight bold
                color #fff
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-50%)
    .hot-right
        width 75%
        height 100%
        .title
            width 100%
            height 2rem
            line-height 2rem
            padding-left 1rem
            box-sizing border-box
            font-size 1rem
            font-weight bold
            background-color $mainColor
        .list-wrapper
            width 100%
            height 18rem
            overflow hidden
            position relative
            .container
                width 100%
                border-collapse collapse
                td
                    border-top 0.1rem solid $activeColor
                    border-bottom 0.1rem solid $activeColor
                    padding 0.5rem
            .container tr:nth-child(even)
                background-color #f2f2f2
            .container tr:hover
                background-color v
</style>