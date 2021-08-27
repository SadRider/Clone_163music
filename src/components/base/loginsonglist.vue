<template>
    <div class="songlist-wrapper" ref="content">
        <div class="songlist-container">
            <div class="list-container" 
            v-for="(item,index) in List" 
            :key="item.id" 
            @click="toPlayList(item.id,index)"
            :class="{active:index==active}">
                <div class="coverImg-wrapper">
                    <img v-lazy="item.coverImgUrl" class="coverImg">
                </div>
                <div class="list-name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {UserList} from '../../api/login'
import {mapGetters} from 'vuex'
import Bscroll from "@better-scroll/core"
import MouseWheel from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
export default {
    name:'LoginSongList',
    data() {
        return {
            List:[],
            active:-1
        }
    },
    methods: {
        getSongList(){
            if(this.uid){
                UserList(this.uid).then(res=>{
                    this.List = res.playlist
                })
            }
        },
        toPlayList(id,index){
            this.$router.push({
                name:'playlist',
                params:{id}
            }),
            this.active=index
        }
    },
    computed:{
        ...mapGetters({
            uid:'login/getUID'
        })
    },
    created() {
        this.getSongList()
        this.$nextTick(()=>{
            Bscroll.use(MouseWheel)
            Bscroll.use(ScrollBar)
            if(!this.scroll){
            this.scroll = new Bscroll(this.$refs.content,{
                click:false,
                mouseWheel: true,
                disableMouse:true,
                scrollY: true,
                scrollbar: true
                })
                setTimeout(() => {
                    this.scroll.refresh()
                }, 100);
            }
        })
    },
    mounted() {

    },
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.songlist-wrapper
    width 100%
    height 35rem
    overflow hidden
    position relative
    .songlist-container
        width 100%
        padding 0.5rem
        box-sizing border-box
        .list-container
            cursor pointer
            width 17.75rem
            height 4rem
            padding 0.1rem
            box-sizing border-box
            display flex
            .coverImg-wrapper
                width 3.8rem
                height 3.8rem
                border-radius 0.5rem
                margin-right 0.5rem
                .coverImg
                    width 100%
                    border-radius 50%
            .list-name
                width 12.8rem
                height 3.8rem
                line-height 3.8rem
                ellipsis()
        .active
            color $bgColor
            background-color $activeColor
</style>