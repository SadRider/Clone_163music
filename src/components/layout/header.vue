<template>
    <div class="header">
        <div class="home">
            <!-- <i class="el-icon-s-home font"></i> -->
            <router-link to='/'>
                <span class="iconfont font">&#xe9db;</span>
            </router-link>
        </div>
        <router-link to='/'>
            <div class="name">好耶音乐</div>
        </router-link>

    </div>
</template>

<script>
export default {
    name:'IndexHeader'
}
</script>

<style lang="stylus" scoped>
.header
    display flex
    // justify-content space-between
    height 3.125rem
    background-color rgba(0,163,216,1)
    padding 0.3125rem 1rem
    .home
        width 2.5rem
        height 2.5rem
        background-color #fff
        border-radius 1.25rem
        margin auto 0
        .font
            color rgba(0,163,216,1)
            font-size 2rem
            height 2.5rem
            line-height 2.5rem
            padding 0 0.25rem
    .name
        font-size 2rem
        color #fff
        margin auto 1rem
</style>