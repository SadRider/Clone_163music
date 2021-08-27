<template>
    <button class="button">{{text}}</button>
</template>

<script>
export default {
    name:'Button',
    props:{
        text:String
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/preset/varibles.styl';
@import '~@/assets/preset/mixins.styl';
    
.button
    font-size 1rem
    font-weight bold
    color #fff
    background-color $bgColor
    width 6rem
    height 2.5rem
    border 0
    border-radius 2.5rem
.button:active
    background-color #fff
    color $bgColor
</style>