<template>
    <div class="header">
        <div class="home">
            <router-link to='/'>
                <span class="iconfont font">&#xe9db;</span>
            </router-link>
        </div>
        <div class="title">
            <router-link to='/'>
                <span class="name">好耶音乐</span>
            </router-link>
        </div>
        <Search />
        <div class="button-wrapper" @click="Logout" v-show="cookie"><Button :text="'退出登录'"/></div>
    </div>
</template>

<script>
import Search from '../base/search.vue'
import Button from '../base/button_B.vue'
import {mapGetters} from 'vuex'
export default {
    name:'IndexHeader',
    components:{
        Search,
        Button
    },
    methods: {
        Logout(){
            localStorage.removeItem('cookie')
            localStorage.removeItem('avatar')
            localStorage.removeItem('nickName')
            localStorage.removeItem('uid')
            setTimeout(() => {
            this.$router.push({
                name:'discovery'
            })
            this.$router.go(0)
            }, 1000);
        }
    },
    computed:{
        ...mapGetters({
            cookie:'login/getCookie'
        })
    }

}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';

.header
    display flex
    // justify-content space-between
    height 4rem
    background-color $bgColor
    padding 0.3125rem 1rem
    position relative
    .home
        width 2.5rem
        height 2.5rem
        background-color #fff
        border-radius 1.25rem
        margin auto 0
        .font
            color $bgColor
            font-size 2rem
            height 2.5rem
            line-height 2.5rem
            padding 0 0.25rem
    .title
        height 2.5rem
        margin auto 0
        .name
            color #fff
            font-size 2rem
            height 2.5rem
            line-height 2.5rem
            padding 0 0.25rem
    .button-wrapper
        position absolute
        top 50%
        right 5%
        transform translateY(-50%)
</style>